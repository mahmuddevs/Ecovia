"use server"

import Event from "@/db/EventSchema"
import dbConnect from "@/lib/dbConnect"

interface EventFormData {
  name: string
  description: string
  eventType: "Awareness Campaign" | "Clean-up Drive" | "Webinar"
  date: string
  location: string
  maxVolunteer: number
  deadline: string
  bannerImage: FileList | string
}

export const getAllEvents = async (
  page: number = 1,
  limit: number = 12,
  sortOrder: number = 0
) => {
  await dbConnect();

  const skip = (page - 1) * limit;

  let sortOption: Record<string, 1 | -1> = {};
  if (sortOrder !== 0) {
    sortOption = { date: sortOrder === -1 ? -1 : 1 };
  }

  const [events, total] = await Promise.all([
    Event.find({})
      .sort(sortOption)
      .skip(skip)
      .limit(limit),
    Event.countDocuments(),
  ]);

  if (!events || events.length === 0) {
    return { success: false, message: "No Events Found" };
  }

  // Convert Mongoose documents safely to plain JSON objects
  const safeEvents = JSON.parse(JSON.stringify(events));

  return {
    success: true,
    events: safeEvents,
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  };
};


export const getEventById = async (id: string) => {
  await dbConnect()

  const event = await Event.findById(id)

  if (!event) {
    return { success: false, message: "No Event Found" }
  }

  const safeEvent = JSON.parse(JSON.stringify(event))

  return { success: true, event: safeEvent }
}

export const getFeaturedEvents = async () => {
  await dbConnect()

  const events = await Event.find({}).sort({ createdAt: -1 }).limit(3)

  if (!events) {
    return { success: false, message: "No Events Found" }
  }

  const safeEvents = JSON.parse(JSON.stringify(events))

  return { success: true, events: safeEvents }
}

export const addEvent = async (data: EventFormData) => {
  if (!data) {
    return { success: false, message: "No Data Received" }
  }

  const file = data.bannerImage[0]

  if (!file) {
    return { success: false, message: "Image Not Found" }
  }

  const formData = new FormData()
  formData.append("image", file)

  const res = await fetch(
    `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
    {
      method: "POST",
      body: formData,
    }
  )

  const img = await res.json()

  if (!img) {
    return { success: false, message: "Image Upload Failed" }
  }

  const imageURL = img?.data?.image?.url

  const eventData = { ...data, bannerImage: imageURL }

  await dbConnect()

  const result = await Event.create(eventData)

  if (!result) {
    return { success: false, message: "Failed To Create Event" }
  }

  const safeEvent = JSON.parse(JSON.stringify(result))

  return {
    success: true,
    message: "Event Create Successfully",
    newEvent: safeEvent,
  }
}

export const deleteEvent = async (id: string) => {
  if (!id) {
    return { success: false, message: "Event ID Not Valid" }
  }

  const result = await Event.findByIdAndDelete(id)

  if (!result) {
    return { success: false, message: "Unable To Delete Event" }
  }

  const safeDeletedEvent = JSON.parse(JSON.stringify(result))

  return {
    success: true,
    message: "Event Deleted Successfully",
    deletedEvent: safeDeletedEvent,
  }
}

export const updateEvent = async (id: string, data: EventFormData) => {
  if (!id || !data) {
    return { success: false, message: "No Data Received" }
  }

  let eventData = {}

  const file = data?.bannerImage[0]

  if (file) {
    const formData = new FormData()
    formData.append("image", file)

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
      {
        method: "POST",
        body: formData,
      }
    )

    const img = await res.json()

    if (!img) {
      return { success: false, message: "Image Upload Failed" }
    }

    const imageURL = img?.data?.image?.url

    eventData = { ...data, bannerImage: imageURL }
  } else {
    eventData = { ...data }
  }

  await dbConnect()

  const result = await Event.findByIdAndUpdate(id, eventData, { new: true })

  if (!result) {
    return { success: false, message: "Failed To Create Event" }
  }

  const safeEvent = JSON.parse(JSON.stringify(result))

  return {
    success: true,
    message: "Event Create Successfully",
    updatedEvent: safeEvent,
  }
}

export const upcomingEvents = async () => {
  await dbConnect()

  const upcomingEvents = await Event.countDocuments({
    date: { $gte: new Date() },
  })

  return upcomingEvents
}
