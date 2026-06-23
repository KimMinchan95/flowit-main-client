import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

export const DATE_INPUT_FORMAT = 'YYYY-MM-DD';

export { dayjs };
