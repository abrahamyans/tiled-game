/**
 * Created by sam on 9/21/16.
 */

"use strict";

define(function(){
    return function(rows, cols){

        var nearestR = nextBinPow(rows), nearestC = nextBinPow(cols);

        function nextBinPow(n){
            var ans = 1;
            while(ans <= n)
                ans *= 2;
            return ans;
        }

        function encodePair(row, col){
            var res = row;
            res *= nearestC;
            res += col;
            return res;
        }


        function decodePair(encoded){
            var col = encoded % nearestC;
            var row = Math.floor(encoded / nearestC);
            return {row: row, col:col };
        }

        function responseModel(){
            return {
                rotate: [],
                chown: []
            }
        }

        function requestModel(){
            return {row: null, col: null}
        }



        return {

            encodeServerResponse: function(obj){
                var encoded = "";
                if (obj.rotate.length == 0)
                    return encoded;


                encoded += String.fromCharCode(encodePair(obj.rotate.row, obj.rotate.col) );
                var i;
                for (i in obj.chown){
                    var code = encodePair(obj.chown[i].row, obj.chown[i].col);
                    encoded += String.fromCharCode(code);
                }

                return encoded;
            },

            decodeServerResponse: function(encoded){

                var decoded = responseModel();
                if (encoded.length == 0)
                    return decoded;

                var rotateTile = decodePair(encoded.charCodeAt(0));
                decoded.rotate = {row: rotateTile.row, col: rotateTile.col};



                for (var i=1; i<encoded.length; ++i){
                    var chownTile = decodePair(encoded.charCodeAt(i));
                    decoded.chown.push({row: chownTile.row, col: chownTile.col});
                }

                return decoded;
            },

            encodeClientRequest: function(obj){
                var encoded = "";


                var clickEncoded = encodePair(obj.row, obj.col);
                encoded += String.fromCharCode(clickEncoded);



                return encoded;
            },

            decodeClientRequest: function(encoded){
                var obj = requestModel();

                var clickPos = decodePair(encoded.charCodeAt(0));
                obj.row = clickPos.row;
                obj.col = clickPos.col;

                return obj;
            }
        };
    };
});




module.exports = Compressor;