import { parse } from "https://deno.land/std@0.184.0/yaml/mod.ts";
import { z } from "https://deno.land/x/zod@v3.16.1/mod.ts";

// the model is a dictionary of string keys and objects
const model = z.record(z.object({
  type: z.string(),
  color: z.string().optional(),
  extensions: z.array(z.string()).optional(),
  aliases: z.array(z.string()).optional(),
  interpreters: z.array(z.string()).optional(),
  filenames: z.array(z.string()).optional(),
  tm_scope: z.string().optional(),
  ace_mode: z.string().optional(),
  codemirror_mode: z.string().optional(),
  codemirror_mime_type: z.string().optional(),
  language_id: z.number(),
}));

const data = await fetch(
  "https://rawgit.com/github/linguist/master/lib/linguist/languages.yml",
)
  .then((res) => res.text()) // get text
  .then((res) => parse(res)) // parse yaml
  .then((res) => model.parse(res)); // validate

await Deno.writeTextFile("./data.json", JSON.stringify(data, null, 2));
