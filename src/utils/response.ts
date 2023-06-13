import { Response } from 'express';
import { HttpStatusEnum } from '../enums';

/**
 * This function formats success response.
 *
 * @param {Object} data
 * @param {String} statusText
 */
const successResponseData = ({ data, message = '', res, statusCode = HttpStatusEnum.OK }: { data?: Object | Object[] | null, message?: string, res: Response, statusCode?: HttpStatusEnum }) => {
    res.status(statusCode).json({
        success: true,
        message,
        statusCode,
        ...(data && { data })
    });
}

export { successResponseData }