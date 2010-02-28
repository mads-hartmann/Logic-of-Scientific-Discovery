/*
 * Raphael Shadow Plugin 0.2
 *
 * Copyright (c) 2009 Dmitry Baranovskiy (http://raphaeljs.com)
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 */
Raphael.shadow=function(G,F,H,Q,C){C=C||{};
var I=~~(M*0.3+0.5),M=(C.size||1)*10,P=C.color||"#fff",E=C.stroke||P,N=C.shadow||"#000",D=C.r||3,K=M,S=M*2,L=S+K,O=this.format("r{0}-{0}",N),B="rect",J="circle",A="none";
var T=this([G-K,F-I,H+(G=K)*2,Q+(F=I)+S,{type:B,x:G-K,y:F-I,width:S+K,height:Q+F+S,stroke:A,fill:this.format("180-{0}-{0}",N),opacity:0,"clip-rect":[G-K+1,F-I+L,S,Q+F+S-L*2+0.9]},{type:B,x:G+H-S,y:F-I,width:S+K,height:Q+F+S,stroke:A,fill:this.format("0-{0}-{0}",N),opacity:0,"clip-rect":[G+H-K+1,F-I+L,S,Q+F+S-L*2]},{type:B,x:G+S-1,y:F+Q-K,width:H+S,height:S+K,stroke:A,fill:this.format("270-{0}-{0}",N),opacity:0,"clip-rect":[G+S,F+Q-K,H+S-L*2,S+K]},{type:B,x:G+K-1,y:F-I,width:H+S,height:S+K,stroke:A,fill:this.format("90-{0}-{0}",N),opacity:0,"clip-rect":[G+S,F-I,H+S-L*2,K+I+1]},{type:J,cx:G+S,cy:F+Q-K,r:L,stroke:A,fill:O,opacity:0,"clip-rect":[G-K,F+Q-K+0.999,L,L]},{type:J,cx:G+H-S,cy:F+Q-K,r:L,stroke:A,fill:O,opacity:0,"clip-rect":[G+H-S,F+Q-K,L,L]},{type:J,cx:G+S,cy:F-I+L,r:L,stroke:A,fill:O,opacity:0,"clip-rect":[G-K,F-I,L,L]},{type:J,cx:G+H-S,cy:F-I+L,r:L,stroke:A,fill:O,opacity:0,"clip-rect":[G+H-S,F-I,L,L]},{type:B,x:G,y:F,width:H,height:Q,r:D,fill:P,stroke:E}]);
return T[0].paper
};