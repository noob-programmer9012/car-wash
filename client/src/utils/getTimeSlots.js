const generateTimeSlots = (duration, startTiming, endTiming) => {
  const slots = [];
  const start = new Date();
  start.setHours(startTiming, 0, 0, 0); // Set to start of day

  const end = new Date();
  end.setHours(endTiming, 0, 0, 0);

  // count loop time
  // total working hours (in minuts) / duration (in minutes)
  const loopCounter = (24 * 60) / duration;

  for (let i = 0; i < loopCounter; i++) {
    const slotStart = new Date(start.getTime() + i * duration * 60 * 1000);
    const slotEnd = new Date(slotStart.getTime() + duration * 60 * 1000);

    if (slotStart >= end) break;

    slots.push(
      `${slotStart.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} - ${slotEnd.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`,
    );
  }

  return slots;
};

// Usage
// const timeSlots = generateTimeSlots(60, 10, 14);
// console.log(timeSlots);

export default generateTimeSlots;
