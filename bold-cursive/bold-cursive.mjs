/**
 * Handle incoming request.
 *
 * @param {Request} request
 * @param {object} context
 * @returns {Promise<Response>}
 */
export default async (request, context) => {
  console.log(  context.constructor.name );
  const tool = context.params.tool;

  if( 'POST' === request.method && ['cursive', 'strikethrough'].includes( tool ) ) {
    let text = await request.text();

    if( 'cursive' === tool ) {
      text = cursive( text );
    } else if( 'strikethrough' === tool ) {
      text = strikethrough( text );
    }

    return new Response( text );
  }

  return new Response( null, { status: 500 } );
};

/**
 * Translate string to cursive letters.
 *
 * @param {string} string String to be translated.
 * @return {string} Translated string.
 */
function cursive( string ) {
  const replacements = { 65: 120016, 66: 120017, 67: 120018, 68: 120019, 69: 120020, 70: 120021, 71: 120022, 72: 120023, 73: 120024, 74: 120025, 75: 120026, 76: 120027, 77: 120028, 78: 120029, 79: 120030, 80: 120031, 81: 120032, 82: 120033, 83: 120034, 84: 120035, 85: 120036, 86: 120037, 87: 120038, 88: 120039, 89: 120040, 90: 120041, 97: 120042, 98: 120043, 99: 120044, 100: 120045, 101: 120046, 102: 120047, 103: 120048, 104: 120049, 105: 120050, 106: 120051, 107: 120052, 108: 120053, 109: 120054, 110: 120055, 111: 120056, 112: 120057, 113: 120058, 114: 120059, 115: 120060, 116: 120061, 117: 120062, 118: 120063, 119: 120064, 120: 120065, 121: 120066, 122: 120067 };
  const translated = [];

  for (let i = 0; i < string.length; i += 1) {
    const codePoint = string.codePointAt(i);
    const replacementCodePoint = typeof replacements[codePoint] === 'undefined' ? codePoint : replacements[codePoint];
    translated.push(String.fromCodePoint(`0x${replacementCodePoint.toString(16)}`));
  }

  return translated.join('');
}

/**
 * Translate string to crossed out letters.
 *
 * @param {string} string String to be translated.
 * @return {string} Translated string.
 */
function strikethrough( string ) {
  const translated = [];

  for (let i = 0; i < string.length; i += 1) {
    translated.push(string.charAt(i));
    translated.push('\u0336');
  }

  return translated.join('');
}

/**
 * Endpoint settings.
 *
 * @type {object}
 */
export const config = {
  path: "/:tool"
};
