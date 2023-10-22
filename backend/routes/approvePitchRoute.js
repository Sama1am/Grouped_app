const express = require("express");
const nodemailer = require('nodemailer');
const approvePitchRoute = express.Router();
const PDFDocument = require('pdfkit');
const fs = require('fs');

const sendLoginEmail = async (email, projectNames, disc, groupMembers) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.EMAILUSERNAME,
      pass: process.env.EMAILPASSWORD,
    },
  });

  message = generateEmailMessage(projectNames, disc, groupMembers);

  const mailOptions = {
    from: process.env.EMAILUSERNAME,
    to: email,
    subject: 'Your group',
    text: message
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

function generateEmailMessage(name, disc, members){
    message = "You have been put into a group!\n " 
      + "Group: "+ name +"\n"
      + "Discription: " + disc + "\n"
      + "Group members: " + members;

    return message;
}

function sendEmailWithAttachment(email, groupMembers){
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.EMAILUSERNAME,
      pass: process.env.EMAILPASSWORD,
    },
  });

  generatePDF(groupMembers);
  const mailOptions = {
    from: process.env.EMAILUSERNAME,
    to: email,
    subject: 'List of porject groups',
    text: "Project group list",
    attachments: [
      {
        filename: 'project_groups.pdf',
        path: 'project_groups.pdf',
      },
    ],
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
}

function generatePDF(data) {
  //let message = data.map((pitch) => `Group: ${pitch.name} Discription: ${data.disc} Members: ${data.members}`);
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream('project_groups.pdf'));

  // Add content to the PDF
  doc.fontSize(16).text('Group list', 100, 50);
  let yPosition = 100; // Initial Y position
  const lineHeight = 20; // Line height (adjust as needed)

  data.forEach((pitch) => {
    // Add the message to the PDF
    doc.fontSize(12).text(`Group: ${pitch.name}`, 100, yPosition);
    doc.fontSize(12).text(`Description: ${pitch.disc}`, 100, yPosition + lineHeight);
    doc.fontSize(12).text(`Members: ${pitch.members}`, 100, yPosition + 2 * lineHeight);

    // Increment the Y position for the next message
    yPosition += 3 * lineHeight; // Adjust the multiplier as needed
  });

  doc.end();
}

module.exports = { approvePitchRoute, sendLoginEmail, sendEmailWithAttachment };
