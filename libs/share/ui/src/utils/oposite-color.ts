export function getOppositeColor(rgbString: string): string {
  // Check if the input is a valid hex color
  if (!/^#[0-9A-Fa-f]{6}$/.test(rgbString)) {
    throw new Error('Invalid RGB string format');
  }

  // Extract the red, green, and blue components
  const red = parseInt(rgbString.substring(1, 3), 16);
  const green = parseInt(rgbString.substring(3, 5), 16);
  const blue = parseInt(rgbString.substring(5, 7), 16);

  // Calculate the opposite color
  const oppositeRed = 255 - red;
  const oppositeGreen = 255 - green;
  const oppositeBlue = 255 - blue;

  // Convert back to a hex string and return
  return `#${oppositeRed.toString(16).padStart(2, '0')}${oppositeGreen.toString(16).padStart(2, '0')}${oppositeBlue.toString(16).padStart(2, '0')}`;
}
