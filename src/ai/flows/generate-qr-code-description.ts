'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating a concise description of a QR code based on its customization.
 *
 * @function generateQrCodeDescription - The main function to generate the QR code description.
 * @interface GenerateQrCodeDescriptionInput - The input type for the generateQrCodeDescription function.
 * @interface GenerateQrCodeDescriptionOutput - The output type for the generateQrCodeDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateQrCodeDescriptionInputSchema = z.object({
  content: z.string().describe('The URL or text encoded in the QR code.'),
  dotColor: z.string().describe('The color of the dots in the QR code (e.g., #9D4EDD).'),
  backgroundColor: z.string().describe('The background color of the QR code (e.g., #E9D5FF).'),
  cornerColor: z.string().describe('The color of the corners in the QR code (e.g., #C8B6FF).'),
  dotStyle: z
    .enum(['square', 'dotted', 'rounded', 'extraRounded', 'classic'])
    .describe('The style of the dots in the QR code.'),
  cornerStyleFrame: z
    .enum(['square', 'dotted', 'extraRounded'])
    .describe('The style of the frame around the corners.'),
  cornerStyleDot: z
    .enum(['square', 'dotted'])
    .describe('The style of the dot within the corners.'),
  logo: z
    .string()
    .optional()
    .describe(
      "A data URI of the logo image to be included in the QR code. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  logoSize: z.number().describe('The size of the logo as a percentage of the QR code size (e.g., 0.3).'),
  logoMargin: z.number().describe('The margin around the logo in pixels (e.g., 10).'),
  hidePointsBehindLogo: z
    .boolean()
    .describe('Whether to hide the QR code points behind the logo for better readability.'),
  errorCorrectionLevel: z
    .enum(['low', 'medium', 'quartile', 'high'])
    .describe(
      'The error correction level of the QR code, determining its resilience to damage (low, medium, quartile, high).'
    ),
});
export type GenerateQrCodeDescriptionInput = z.infer<typeof GenerateQrCodeDescriptionInputSchema>;

const GenerateQrCodeDescriptionOutputSchema = z.object({
  description: z.string().describe('A concise description of the generated QR code.'),
});
export type GenerateQrCodeDescriptionOutput = z.infer<typeof GenerateQrCodeDescriptionOutputSchema>;

export async function generateQrCodeDescription(input: GenerateQrCodeDescriptionInput): Promise<GenerateQrCodeDescriptionOutput> {
  return generateQrCodeDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateQrCodeDescriptionPrompt',
  input: {schema: GenerateQrCodeDescriptionInputSchema},
  output: {schema: GenerateQrCodeDescriptionOutputSchema},
  prompt: `You are an expert marketing copywriter specializing in QR codes.

  Based on the following customization options, generate a concise and engaging description of the QR code.
  The description should highlight the key features and design elements of the QR code in a way that is appealing to potential users.

  Content: {{{content}}}
  Dot Color: {{{dotColor}}}
  Background Color: {{{backgroundColor}}}
  Corner Color: {{{cornerColor}}}
  Dot Style: {{{dotStyle}}}
  Corner Style Frame: {{{cornerStyleFrame}}}
  Corner Style Dot: {{{cornerStyleDot}}}
  {{#if logo}}Logo: {{media url=logo}}{{/if}}
  Logo Size: {{{logoSize}}}
  Logo Margin: {{{logoMargin}}}
  Hide Points Behind Logo: {{{hidePointsBehindLogo}}}
  Error Correction Level: {{{errorCorrectionLevel}}}

  Description:`,
});

const generateQrCodeDescriptionFlow = ai.defineFlow(
  {
    name: 'generateQrCodeDescriptionFlow',
    inputSchema: GenerateQrCodeDescriptionInputSchema,
    outputSchema: GenerateQrCodeDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
