const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.email",
  port: 465,
  secure: true,
  auth: {
    user: "taherasghar59@gmail.com",
    pass: process.env.APP_KEY_PASSWORD,
  },
});

const successfulCheckoutNotification = asyncHandler(async (req, res) => {
  const user = req.user;
  const stadium = req.stadium;
  const { date, timeSlot } = req.body;
  try {
    async function main() {
      const info = await transporter.sendMail({
        from: "PitchPal Team",
        to: `${user.email}`,
        subject: `Booking at ${stadium.name}`,
        text: `Dear ${user.username},

      We're excited to inform you that your booking for a time slot at ${stadium.name} has been successfully confirmed!
      
      Date: ${date}
      Time Slot: ${timeSlot}
      
      We look forward to welcoming you at the stadium! 
      For any inquiries or assistance, you can contact the stadium at ${stadium.phoneNumber}. 

      Have a fantastic match!
      PitchPal Team :)`,
      });
    }

    main().then((info) => {
      console.log(`Email has been sent successfully to ${user.email}`);
    });
  } catch (error) {
    console.log("Error while sending notification...\n" + error);
  }
});

const successfulSignUp = asyncHandler(async (req, res) => {
  const user = req.user;

  try {
    async function main() {
      const info = await transporter.sendMail({
        from: "PitchPal Team",
        to: `${user.email}`,
        subject: `Welcome ${user.username}!`,
        text: `Welcome to PitchPal – Your Ultimate Destination for Football Action!

        Congratulations, ${user.username}, you've just unlocked a world of endless football excitement! 🎉
        
        With our user-friendly interface, booking your dream pitch is a breeze. 
        Simply browse through our wide selection of stadiums,choose the perfect match time,
         and get ready to kick off unforgettable moments on the field.
        
        You can either sign in with your email : ${user.email} or username : ${user.username}.

        Welcome aboard, and let the games begin!

        Warm Regards,
        PitchPal Team :)`,
      });
    }
    main().then((info) => {
      console.log(`Email has been sent successfully to ${user.email}`);
    });
  } catch (error) {
    console.log("Error while sending notification...\n" + error);
  }
});

const successfulHostFormApplication = asyncHandler(async (req, res) => {
  const form = req.form;
  const user = req.user;

  try {
    async function main1() {
      const info = await transporter.sendMail({
        from: "PitchPal Team",
        to: `${user.email}`,
        subject: `We've got your application form – thank you!`,
        text: `Dear ${user.username},

Our team will now review your application [${form?._id}] thoroughly to ensure that we match hosts with suitable opportunities in alignment with our platform's standards and objectives.
We understand the importance of this process and assure you that we will handle your application with the utmost care and attention to detail.

Should we require any further information or clarification regarding your application, we will not hesitate to reach out to you promptly.

In the meantime, please feel free to contact us if you have any questions or concerns.
We value your interest in our platform and look forward to the possibility of collaborating with you in the future.

We kindly ask for your patience during this process, usually it takes 2-3 days working days.
Stay tuned for updates and feel free to reach out if you have any questions in the meantime.

Warm Regards,
PitchPal Team :)`,
      });
    }

    async function main2() {
      const info = await transporter.sendMail({
        from: "PitchPal Team",
        to: `pitchpal.official@gmail.com`,
        subject: `A New User Applied For A Stadium Host!`,
        text: `Dear Admins,

Please make sure to check [${user.username}:${user.id}]'s host form of id [${form?._id}].

Good Luck!
Host Form Controller :)`,
      });
    }

    main1().then(() => {
      console.log(`Email has been sent successfully to ${user.email}`);
    });
    main2().then(() => {
      console.log(`Email has been sent successfully to Admins`);
    });
  } catch (error) {
    console.log("Error while sending notification...\n" + error);
  }
});

module.exports = {
  successfulCheckoutNotification,
  successfulSignUp,
  successfulHostFormApplication,
};
