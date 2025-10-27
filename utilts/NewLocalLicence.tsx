import { z } from "zod";
const LocalLicenceSchema = z.object({
  licenseClassId: z.string().nonempty(" please licence class"),
});
export default LocalLicenceSchema;
