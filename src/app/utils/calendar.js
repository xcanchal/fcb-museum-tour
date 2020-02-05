import ICAL from 'ical.js';
import calendarFile from '../../../config/calendar.ics';

export default class xCalendar {
  constructor() {
    if (!calendarFile) {
      throw new Error('Calendar file not found');
    }
    try {
      this.calendar = new ICAL.Component(ICAL.parse(calendarFile));
    } catch (e) {
      console.error(e);
    }
  }

  getRawEvents() {
    const rawEvents = this.calendar.getAllSubcomponents('vevent');
    if (!rawEvents || !rawEvents.length) {
      return [];
    }
    return this.calendar.getAllSubcomponents('vevent');
  }

  getParsedEvents() {
    try {
      return this.getRawEvents().map((event) => {
        if (!event) {
          return false;
        }
        return {
          summary: event.getFirstPropertyValue('summary'),
          start: event.getFirstPropertyValue('dtstart').toUnixTime(),
          end: event.getFirstPropertyValue('dtend').toUnixTime(),
        };
      });
    } catch (err) {
      return console.error('Calendar error', err);
    }
  }
}
