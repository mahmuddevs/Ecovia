"use server";

import VolunteerApplication from "@/db/VolunteerApplicationSchema";
import dbConnect from "@/lib/dbConnect";

interface VolunteerApplicationData {
  eventId: string;
  name: string;
  email: string;
  description: string;
}

export const ApplyAsVolunteer = async ({
  eventId,
  name,
  email,
  description,
}: VolunteerApplicationData) => {
  if (!eventId || !name || !email || !description) {
    return { success: false, message: "Application Failed" };
  }

  await dbConnect();

  const existing = await VolunteerApplication.findOne({
    eventId,
    email,
  });

  if (existing) {
    return { success: false, message: "Application Exists" };
  }

  const applicationData = {
    eventId,
    name,
    email,
    description,
  };

  const result = await VolunteerApplication.create(applicationData);

  if (!result) {
    return { success: false, message: "Application Failed" };
  }

  return { success: true, message: "Application Successful" };
};
