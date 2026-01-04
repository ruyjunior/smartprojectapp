import { NextRequest } from "next/server";
import Stripe from "stripe";
import { sql } from "@vercel/postgres";

// Initialize Stripe with the correct API version
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-12-15.clover',
});

// Helper function to read raw body
async function getRawBody(readable: ReadableStream<Uint8Array>): Promise<Buffer> {
  const chunks = [];
  const reader = readable.getReader();

  let result;
  while (!(result = await reader.read()).done) {
    chunks.push(result.value);
  }

  return Buffer.concat(chunks);
}

export async function POST(req: NextRequest) {
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return new Response("No signature header", { status: 400 });
  }

  let event: Stripe.Event;
  let rawBody: Buffer;

  try {
    // Get raw body before any parsing
    rawBody = await getRawBody(req.body!);

    // Verify signature with raw body
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("❌ Webhook error:", err);
    const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
    return new Response(`Webhook Error: ${errorMessage}`, { status: 400 });
  }

  // Handle specific event types
  switch (event.type) {
    case "checkout.session.completed":
      try {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log("Checkout session completed:", session);

        // Validate required fields
        if (!session.customer_details?.email) {
          throw new Error("Customer email is required");
        }

        const customerEmail = session.customer_details.email;
        const paymentIntentId = typeof session.payment_intent === "string"
          ? session.payment_intent
          : null;

        // Process custom field
        const nomeCompany = session.custom_fields?.find(
          (field: any) => field.key === "company_name"
        )?.text?.value ?? "Empresa Sem Nome";

        // Calculate expiration date
        const expiresAt = new Date();
        if (session.metadata?.plan_type === "mensal") {
          expiresAt.setMonth(expiresAt.getMonth() + 1);
        } else if (session.metadata?.plan_type === "anual") {
          expiresAt.setFullYear(expiresAt.getFullYear() + 1);
        }
        console.log('expiresAt', expiresAt);

        // Update database
        await sql`
        INSERT INTO smartprojectsapp.users (email, name, role)
        VALUES ( ${customerEmail}, ${session.customer_details.name}, 'admin')
        ON CONFLICT (email) DO NOTHING
        `;

        // Check and create clinic if needed
        const userResult = await sql`
          SELECT id FROM smartprojectsapp.users WHERE email = ${customerEmail}
        `;

        if (userResult.rows && userResult.rows.length > 0) {
          const userId = userResult.rows[0].id;

          const companyCheck = await sql`
          SELECT id FROM smartprojectsapp.companies WHERE idmanager = ${userId}
          `;

          if (companyCheck.rows && companyCheck.rows.length === 0) {
            await sql`
            INSERT INTO smartprojectsapp.companies (name, idmanager)
            VALUES (${nomeCompany}, ${userId})
          `;
            let amount = session.amount_total;

            if (amount !== null) {
              amount = amount / 100;
            }

            const amountDB = amount !== null ? parseFloat(amount.toFixed(2)) : 0;

            await sql`
            INSERT INTO smartprojectsapp.credits (email, amount, idcompany, expires, type)
            VALUES ( 
            ${customerEmail}, 
            ${amountDB}, 
            ${companyCheck.rows[0].id}, 
            ${expiresAt.toISOString()},
            ${session.metadata?.plan_type}
            )
          `;
            console.log(`✅ Empresa criada para ${nomeCompany}`);
            console.log(`✅ Créditos adicionados para ${customerEmail}`);
          } else {

            let amount = session.amount_total;

            if (amount !== null) {
              amount = amount / 100;
            }

            const amountDB = amount !== null ? parseFloat(amount.toFixed(2)) : 0;

            await sql`
            INSERT INTO smartprojectsapp.credits ( amount, idcompany, expires, type)
            VALUES ( 
            ${amountDB}, 
            ${companyCheck.rows[0].id}, 
            ${expiresAt.toISOString()},
            ${session.metadata?.plan_type}
            )
          `;
            console.log(`🔎 Empresa já existe para o usuário ${customerEmail}`);
            console.log(`🔎 Crédito adicionado`);
          }

          await sql`
            UPDATE smartprojectsapp.users
            SET  idcompany = ${companyCheck.rows[0].id}
            WHERE email = ${customerEmail}
         `;

        } else {
          console.error("❌ Nenhum usuário foi criado/atualizado");
          return new Response("User not found or not created", { status: 404 });
        }
      } catch (err) {
        console.error("Database error:", err);
        return new Response("Database error", { status: 500 });
      }
      break;

    case "invoice.payment_succeeded":
      // Handle subscription payments
      break;

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
}