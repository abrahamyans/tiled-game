/**
 * Created by sam on 9/22/16.
 */

"use strict";
var Compressor = require('../main/Compressor');
var chai = require('chai');
describe("Compressor test", () => {

    var compressor = Compressor(10, 20);

    it("Encode/decode client request", () => {
        var client = {
            raw: {
                row: 2, col: 5
            },
            encoded: null
        };
        client.encoded = compressor.encodeClientRequest(client.raw);
        var decoded = compressor.decodeClientRequest(client.encoded);
        chai.assert.deepEqual(decoded, client.raw);
    });
    
    
    it("Encode/decode server response", () => {
        var server = {
            raw: {
                rotate: {
                    row: 2, col: 5
                },
                chown: [
                    {row: 2, col: 6},
                    {row: 3, col: 6},
                    {row: 4, col: 6},
                    {row: 4, col: 7},
                    {row: 4, col: 8},
                    {row: 5, col: 8},
                    {row: 5, col: 9},
                    {row: 5, col: 10}
                ]
            },
            encoded: null
        };
        server.encoded = compressor.encodeServerResponse(server.raw);
        var decoded = compressor.decodeServerResponse(server.encoded);
        chai.assert.deepEqual(decoded, server.raw);
    });
});
