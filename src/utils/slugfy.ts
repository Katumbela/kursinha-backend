/* eslint-disable prettier/prettier */
import slugify from 'slugify';

export class SlugUtil {
  static generateSlug(value: string): string {
    return slugify(value, { lower: true, remove: /[*+~.()'"!:@]/g });
  }
}
