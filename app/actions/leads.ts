"use server"
import { Resend } from 'resend';

// Make sure to add RESEND_API_KEY to your .env
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendLead(formData: FormData) {
  const name = formData.get('name') as string;
  const phone = formData.get('phone') as string;
  const propertyTitle = formData.get('propertyTitle') as string;
  const propertyId = formData.get('propertyId') as string;

  try {
    await resend.emails.send({
      from: 'AVH Leads <onboarding@resend.dev>', // Update this once you verify a domain
      to: 'your-email@gmail.com', // 👈 PUT YOUR REAL EMAIL HERE
      subject: `🏠 NEW LEAD: ${propertyTitle}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee;">
          <h2 style="color: #198754;">New Property Inquiry</h2>
          <p><strong>Property:</strong> ${propertyTitle} (ID: ${propertyId})</p>
          <hr />
          <p><strong>Customer Name:</strong> ${name}</p>
          <p><strong>Phone/WhatsApp:</strong> ${phone}</p>
          <br />
          <a href="https://wa.me/${phone.replace(/\D/g, '')}" style="background: #198754; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
            Chat with Customer on WhatsApp
          </a>
        </div>
      `
    });
    return { success: true };
  } catch (error) {
    console.error("Email Error:", error);
    return { success: false, error: "Failed to send email." };
  }
}