import { Request, Response } from 'express';
import Event from '../models/Event';
import { createEventSchema, queryEventSchema } from '../validators/eventValidator';

export const createEvent = async (req: Request, res: Response): Promise<Response> => {
  const { error } = createEventSchema.validate(req.body);
  
  if (error) {
    return res.status(400).json({
      statusCode: 400,
      error: 'Invalid input',
      message: error.details.map(detail => detail.message).join(', '),
    });
  }

  const { description, dayOfWeek, userId } = req.body;

  try {
    const event = new Event({ description, dayOfWeek, userId });
    await event.save();
    return res.status(200).json(event);
  } catch (error) {
    return res.status(500).json({ statusCode: 500, error: 'Internal Server Error', message: 'Something went wrong' });
  }
};

export const getEvents = async (req: Request, res: Response): Promise<Response> => {
  const { error } = queryEventSchema.validate(req.query);

  if (error) {
    return res.status(400).json({
      statusCode: 400,
      error: 'Invalid input',
      message: error.details.map(detail => detail.message).join(', '),
    });
  }

  const { dayOfWeek, description } = req.query;

  try {
    const query: any = {};
    if (dayOfWeek) query.dayOfWeek = dayOfWeek;
    if (description) query.description = { $regex: description, $options: 'i' };

    const events = await Event.find(query);
    return res.status(200).json(events);
  } catch (error) {
    return res.status(500).json({ statusCode: 500, error: 'Internal Server Error', message: 'Something went wrong' });
  }
};

export const getEventById = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  try {
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ statusCode: 404, error: 'Not Found', message: 'Event not found' });
    }
    return res.status(200).json(event);
  } catch (error) {
    return res.status(500).json({ statusCode: 500, error: 'Internal Server Error', message: 'Something went wrong' });
  }
};

export const deleteEventById = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  try {
    const result = await Event.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ statusCode: 404, error: 'Not Found', message: 'Event not found' });
    }
    return res.status(200).json({ statusCode: 200, message: 'Event deleted' });
  } catch (error) {
    return res.status(500).json({ statusCode: 500, error: 'Internal Server Error', message: 'Something went wrong' });
  }
};
export const deleteEventsByDay = async (req: Request, res: Response): Promise<Response> => {
  const { dayOfWeek } = req.query;

  try {
    if (!dayOfWeek || !['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'].includes(dayOfWeek as string)) {
      return res.status(400).json({ statusCode: 400, error: 'Invalid data supplied', message: 'Invalid day of week' });
    }

    const deletedEvents = await Event.find({ dayOfWeek }).lean();
    if (deletedEvents.length === 0) {
      return res.status(404).json({ statusCode: 404, error: 'Not Found', message: 'Events not found' });
    }

    await Event.deleteMany({ dayOfWeek });

    return res.status(200).json({ deletedEvents });
  } catch (error) {
    return res.status(500).json({ statusCode: 500, error: 'Internal Server Error', message: 'Something went wrong' });
  }
};