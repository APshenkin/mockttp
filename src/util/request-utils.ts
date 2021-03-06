/**
 * @module Internal
 */

import * as _ from 'lodash';
import { OngoingRequest } from "../types";

export async function waitForCompletedRequest(request: OngoingRequest) {
    return _(request).pick([
        'protocol',
        'method',
        'url',
        'path',
        'hostname',
        'headers'
    ]).assign({
        body: {
            buffer: await request.body.asBuffer(),
            text: await request.body.asText().catch(() => undefined),
            json: await request.body.asJson().catch(() => undefined),
            formData: await request.body.asFormData().catch(() => undefined)
        }
    }).valueOf();
}