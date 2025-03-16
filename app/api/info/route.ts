const info = {
  name: 'APP Autoric Automation',
  description: 'A app for manager projects',  
};

export async function GET() {
  return Response.json(info);
}   