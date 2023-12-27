export function getContrastingColor(rgbString: string): string {
  // Check if the input is a valid hex color
  if (!/^#[0-9A-Fa-f]{6}$/.test(rgbString)) {
    throw new Error('Invalid RGB string format');
  }

  // Extract the red, green, and blue components
  const red = parseInt(rgbString.substring(1, 3), 16);
  const green = parseInt(rgbString.substring(3, 5), 16);
  const blue = parseInt(rgbString.substring(5, 7), 16);

  // Calculate luminance
  const luminance = 0.299 * red + 0.587 * green + 0.114 * blue;

  // Return black for light colors and white for dark colors
  return luminance > 186 ? '#000000' : '#FFFFFF'; // Threshold can be adjusted
}
