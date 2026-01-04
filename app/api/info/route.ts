const info = {
  name: 'APP Autoric Automation',
  description: 'A app for manager projects',  
  developer: 'Autoric Automation',
  siteDev: 'https://autoric.com',
  contactDev: 'ruyjunior21@gmail.com',
  version: '1.0.0',
};

export async function GET() {
  return Response.json(info);
}   