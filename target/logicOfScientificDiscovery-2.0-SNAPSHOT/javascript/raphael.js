window.Raphael=(function(){var AS=/[, ]+/,E=document,BD=window,AM={was:"Raphael" in BD,is:BD.Raphael},AU=function(){if(AU.is(arguments[0],"array")){var G=arguments[0],F=AF[An](AU,G.splice(0,3+AU.is(G[0],AW))),D=F.set();
for(var A=0,C=G[AL];
A<C;
A++){var B=G[A]||{};
({circle:1,rect:1,path:1,ellipse:1,text:1,image:1}[Ao](B.type))&&D[AQ](F[B.type]().attr(B))
}return D
}return AF[An](AU,arguments)
},Ax={},AA=["click","dblclick","mousedown","mousemove","mouseout","mouseover","mouseup"],BE="",AV=" ",Ao="hasOwnProperty",Aj="prototype",AG="setAttribute",A0="appendChild",An="apply",AL="length",BA="join",AD="split",As="concat",AQ="push",Ah=parseFloat,i=parseInt,Az=Math.pow,A3=Math.min,AP=Math.max,At=Math.round,Aq=/^(?=[\da-f]$)/,AW="number",A9="toString",AN={"clip-rect":"0 0 10e9 10e9",cx:0,cy:0,fill:"#fff","fill-opacity":1,font:'10px "Arial"',"font-family":'"Arial"',"font-size":"10","font-style":"normal","font-weight":400,gradient:0,height:0,href:"http://raphaeljs.com/",opacity:1,path:"M0,0",r:0,rotation:0,rx:0,ry:0,scale:"1 1",src:"",stroke:"#000","stroke-dasharray":"","stroke-linecap":"butt","stroke-linejoin":"butt","stroke-miterlimit":0,"stroke-opacity":1,"stroke-width":1,target:"_blank","text-anchor":"middle",title:"Raphael",translation:"0 0",width:0,x:0,y:0},Af={"clip-rect":"csv",cx:AW,cy:AW,fill:"colour","fill-opacity":AW,"font-size":AW,height:AW,opacity:AW,path:"path",r:AW,rotation:"csv",rx:AW,ry:AW,scale:"csv",stroke:"colour","stroke-opacity":AW,"stroke-width":AW,translation:"csv",width:AW,x:AW,y:AW},Ay="replace";
AU.version="1.2.1";
AU.type=(BD.SVGAngle||E.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure","1.1")?"SVG":"VML");
AU.svg=!(AU.vml=AU.type=="VML");
AU._id=0;
AU._oid=0;
AU.fn={};
AU.is=function(A,B){B=(B+BE).toLowerCase();
return((B=="object"||B=="undefined")&&typeof A==B)||(A==null&&B=="null")||Object[Aj][A9].call(A)[Ay](/^\[object\s+|\]$/gi,BE).toLowerCase()==B
};
AU.setWindow=function(A){BD=A;
E=BD.document
};
var A7=function(B){if(AU.vml){A7=AX(function(D){var I;
try{var C=new ActiveXObject("htmlfile");
C.write("<body>");
C.close();
I=C.body
}catch(G){I=createPopup().document.body
}var F=I.createTextRange();
I.style.color=D;
var H=F.queryCommandValue("ForeColor");
H=((H&255)<<16)|(H&65280)|((H&16711680)>>>16);
return"#"+("000000"+H[A9](16)).slice(-6)
})
}else{var A=E.createElement("i");
A.className="Rapha\u00ebl colour picker";
A.style.cssText="display:none";
E.body[A0](A);
A7=AX(function(C){A.style.color=C;
return E.defaultView.getComputedStyle(A,BE).getPropertyValue("color")
})
}return A7(B)
};
AU.hsb2rgb=AX(function(G,I,B){if(AU.is(G,"object")&&"h" in G&&"s" in G&&"b" in G){B=G.b;
I=G.s;
G=G.h
}var K,M,A;
if(B==0){return{r:0,g:0,b:0,hex:"#000"}
}if(G>1||I>1||B>1){G/=255;
I/=255;
B/=255
}var J=~~(G*6),F=(G*6)-J,L=B*(1-I),P=B*(1-(I*F)),O=B*(1-(I*(1-F)));
K=[B,P,L,L,O,B,B][J];
M=[O,B,B,P,L,L,O][J];
A=[L,L,O,B,B,P,L][J];
K*=255;
M*=255;
A*=255;
var D={r:K,g:M,b:A},N=(~~K)[A9](16),H=(~~M)[A9](16),C=(~~A)[A9](16);
N=N[Ay](Aq,"0");
H=H[Ay](Aq,"0");
C=C[Ay](Aq,"0");
D.hex="#"+N+H+C;
return D
},AU);
AU.rgb2hsb=AX(function(J,I,C){if(AU.is(J,"object")&&"r" in J&&"g" in J&&"b" in J){C=J.b;
I=J.g;
J=J.r
}if(AU.is(J,"string")){var A=AU.getRGB(J);
J=A.r;
I=A.g;
C=A.b
}if(J>1||I>1||C>1){J/=255;
I/=255;
C/=255
}var D=AP(J,I,C),K=A3(J,I,C),F,H,G=D;
if(K==D){return{h:0,s:0,b:D}
}else{var B=(D-K);
H=B/D;
if(J==D){F=(I-C)/B
}else{if(I==D){F=2+((C-J)/B)
}else{F=4+((J-I)/B)
}}F/=6;
F<0&&F++;
F>1&&F--
}return{h:F,s:H,b:G}
},AU);
AU._path2string=function(){var B=BE,C;
for(var F=0,A=this[AL];
F<A;
F++){for(var G=0,D=this[F][AL];
G<D;
G++){B+=this[F][G];
G&&G!=D-1&&(B+=",")
}F!=A-1&&(B+=AV)
}return B[Ay](/,(?=-)/g,BE)
};
function AX(B,A,D){function C(){var F=Array[Aj].splice.call(arguments,0,arguments[AL]),H=F[BA]("\u25ba"),I=C.cache=C.cache||{},G=C.count=C.count||[];
if(I[Ao](H)){return D?D(I[H]):I[H]
}G[AL]>=1000&&delete I[G.shift()];
G[AQ](H);
I[H]=B[An](A,F);
return D?D(I[H]):I[H]
}return C
}AU.getRGB=AX(function(I){if(!I||!!((I+BE).indexOf("-")+1)){return{r:-1,g:-1,b:-1,hex:"none",error:1}
}I=I+BE;
if(I=="none"){return{r:-1,g:-1,b:-1,hex:"none"}
}!(({hs:1,rg:1}[Ao](I.substring(0,2))))&&(I=A7(I));
var F,J,G,A,C=I.match(/^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgb\(\s*([\d\.]+\s*,\s*[\d\.]+\s*,\s*[\d\.]+)\s*\)|rgb\(\s*([\d\.]+%\s*,\s*[\d\.]+%\s*,\s*[\d\.]+%)\s*\)|hs[bl]\(\s*([\d\.]+\s*,\s*[\d\.]+\s*,\s*[\d\.]+)\s*\)|hs[bl]\(\s*([\d\.]+%\s*,\s*[\d\.]+%\s*,\s*[\d\.]+%)\s*\))\s*$/i);
if(C){if(C[2]){A=i(C[2].substring(5),16);
G=i(C[2].substring(3,5),16);
J=i(C[2].substring(1,3),16)
}if(C[3]){A=i(C[3].substring(3)+C[3].substring(3),16);
G=i(C[3].substring(2,3)+C[3].substring(2,3),16);
J=i(C[3].substring(1,2)+C[3].substring(1,2),16)
}if(C[4]){C=C[4][AD](/\s*,\s*/);
J=Ah(C[0]);
G=Ah(C[1]);
A=Ah(C[2])
}if(C[5]){C=C[5][AD](/\s*,\s*/);
J=Ah(C[0])*2.55;
G=Ah(C[1])*2.55;
A=Ah(C[2])*2.55
}if(C[6]){C=C[6][AD](/\s*,\s*/);
J=Ah(C[0]);
G=Ah(C[1]);
A=Ah(C[2]);
return AU.hsb2rgb(J,G,A)
}if(C[7]){C=C[7][AD](/\s*,\s*/);
J=Ah(C[0])*2.55;
G=Ah(C[1])*2.55;
A=Ah(C[2])*2.55;
return AU.hsb2rgb(J,G,A)
}C={r:J,g:G,b:A};
var H=(~~J)[A9](16),D=(~~G)[A9](16),B=(~~A)[A9](16);
H=H[Ay](Aq,"0");
D=D[Ay](Aq,"0");
B=B[Ay](Aq,"0");
C.hex="#"+H+D+B;
return C
}return{r:-1,g:-1,b:-1,hex:"none",error:1}
},AU);
AU.getColor=function(A){var B=this.getColor.start=this.getColor.start||{h:0,s:1,b:A||0.75},C=this.hsb2rgb(B.h,B.s,B.b);
B.h+=0.075;
if(B.h>1){B.h=0;
B.s-=0.2;
B.s<=0&&(this.getColor.start={h:0,s:1,b:B.b})
}return C.hex
};
AU.getColor.reset=function(){delete this.start
};
AU.parsePathString=AX(function(C){if(!C){return null
}var B={a:7,c:6,h:1,l:2,m:2,q:4,s:4,t:2,v:1,z:0},A=[];
if(AU.is(C,"array")&&AU.is(C[0],"array")){A=BC(C)
}if(!A[AL]){(C+BE)[Ay](/([achlmqstvz])[\s,]*((-?\d*\.?\d*(?:e[-+]?\d+)?\s*,?\s*)+)/ig,function(D,G,F){var H=[],I=G.toLowerCase();
F[Ay](/(-?\d*\.?\d*(?:e[-+]?\d+)?)\s*,?\s*/ig,function(J,K){K&&H[AQ](+K)
});
while(H[AL]>=B[I]){A[AQ]([G][As](H.splice(0,B[I])));
if(!B[I]){break
}}})
}A[A9]=AU._path2string;
return A
});
var Ak=AX(function(A){if(!A){return{x:0,y:0,width:0,height:0}
}A=e(A);
var D=0,F=0,I=[],K=[];
for(var G=0,B=A[AL];
G<B;
G++){if(A[G][0]=="M"){D=A[G][1];
F=A[G][2];
I[AQ](D);
K[AQ](F)
}else{var H=A8(D,F,A[G][1],A[G][2],A[G][3],A[G][4],A[G][5],A[G][6]);
I=I[As](H.min.x,H.max.x);
K=K[As](H.min.y,H.max.y)
}}var J=A3[An](0,I),C=A3[An](0,K);
return{x:J,y:C,width:AP[An](0,I)-J,height:AP[An](0,K)-C}
}),BC=function(C){var B=[];
if(!AU.is(C,"array")||!AU.is(C&&C[0],"array")){C=AU.parsePathString(C)
}for(var F=0,A=C[AL];
F<A;
F++){B[F]=[];
for(var G=0,D=C[F][AL];
G<D;
G++){B[F][G]=C[F][G]
}}B[A9]=AU._path2string;
return B
},Ac=AX(function(K){if(!AU.is(K,"array")||!AU.is(K&&K[0],"array")){K=AU.parsePathString(K)
}var F=[],C=0,D=0,Q=0,A=0,M=0;
if(K[0][0]=="M"){C=K[0][1];
D=K[0][2];
Q=C;
A=D;
M++;
F[AQ](["M",C,D])
}for(var I=M,O=K[AL];
I<O;
I++){var N=F[I]=[],B=K[I];
if(B[0]!=B[0].toLowerCase()){N[0]=B[0].toLowerCase();
switch(N[0]){case"a":N[1]=B[1];
N[2]=B[2];
N[3]=B[3];
N[4]=B[4];
N[5]=B[5];
N[6]=+(B[6]-C).toFixed(3);
N[7]=+(B[7]-D).toFixed(3);
break;
case"v":N[1]=+(B[1]-D).toFixed(3);
break;
case"m":Q=B[1];
A=B[2];
default:for(var J=1,H=B[AL];
J<H;
J++){N[J]=+(B[J]-((J%2)?C:D)).toFixed(3)
}}}else{N=F[I]=[];
if(B[0]=="m"){Q=B[1]+C;
A=B[2]+D
}for(var L=0,P=B[AL];
L<P;
L++){F[I][L]=B[L]
}}var G=F[I][AL];
switch(F[I][0]){case"z":C=Q;
D=A;
break;
case"h":C+=+F[I][G-1];
break;
case"v":D+=+F[I][G-1];
break;
default:C+=+F[I][G-2];
D+=+F[I][G-1]
}}F[A9]=AU._path2string;
return F
},0,BC),AH=AX(function(K){if(!AU.is(K,"array")||!AU.is(K&&K[0],"array")){K=AU.parsePathString(K)
}var G=[],D=0,F=0,A=0,B=0,M=0;
if(K[0][0]=="M"){D=+K[0][1];
F=+K[0][2];
A=D;
B=F;
M++;
G[0]=["M",D,F]
}for(var I=M,P=K[AL];
I<P;
I++){var N=G[I]=[],C=K[I];
if(C[0]!=(C[0]+BE).toUpperCase()){N[0]=(C[0]+BE).toUpperCase();
switch(N[0]){case"A":N[1]=C[1];
N[2]=C[2];
N[3]=C[3];
N[4]=C[4];
N[5]=C[5];
N[6]=+(C[6]+D);
N[7]=+(C[7]+F);
break;
case"V":N[1]=+C[1]+F;
break;
case"H":N[1]=+C[1]+D;
break;
case"M":A=+C[1]+D;
B=+C[2]+F;
default:for(var J=1,H=C[AL];
J<H;
J++){N[J]=+C[J]+((J%2)?D:F)
}}}else{for(var L=0,O=C[AL];
L<O;
L++){G[I][L]=C[L]
}}switch(N[0]){case"Z":D=A;
F=B;
break;
case"H":D=N[1];
break;
case"V":F=N[1];
break;
default:D=G[I][G[I][AL]-2];
F=G[I][G[I][AL]-1]
}}G[A9]=AU._path2string;
return G
},null,BC),Al=function(A,B,D,C){return[A,B,D,C,D,C]
},A1=function(B,D,F,A,I,H){var G=1/3,C=2/3;
return[G*B+C*F,G*D+C*A,G*I+C*F,G*H+C*A,I,H]
},R=function(V,t,K,M,U,a,g,W,u,T){var A=Math.PI,N=A*120/180,s=A/180*(+U||0),G=[],J,x=AX(function(BH,y,BG){var z=BH*Math.cos(BG)-y*Math.sin(BG),BF=BH*Math.sin(BG)+y*Math.cos(BG);
return{x:z,y:BF}
});
if(!T){J=x(V,t,-s);
V=J.x;
t=J.y;
J=x(W,u,-s);
W=J.x;
u=J.y;
var C=Math.cos(A/180*U),Y=Math.sin(A/180*U),D=(V-W)/2,F=(t-u)/2;
K=AP(K,Math.abs(D));
M=AP(M,Math.abs(F));
var B=K*K,p=M*M,n=(a==g?-1:1)*Math.sqrt(Math.abs((B*p-B*F*F-p*D*D)/(B*F*F+p*D*D))),P=n*K*F/M+(V+W)/2,Q=n*-M*D/K+(t+u)/2,b=Math.asin((t-Q)/M),c=Math.asin((u-Q)/M);
b=V<P?A-b:b;
c=W<P?A-c:c;
b<0&&(b=A*2+b);
c<0&&(c=A*2+c);
if(g&&b>c){b=b-A*2
}if(!g&&c>b){c=c-A*2
}}else{b=T[0];
c=T[1];
P=T[2];
Q=T[3]
}var X=c-b;
if(Math.abs(X)>N){var O=c,L=W,Z=u;
c=b+N*(g&&c>b?1:-1);
W=P+K*Math.cos(c);
u=Q+M*Math.sin(c);
G=R(W,u,K,M,U,0,g,L,Z,[c,O,P,Q])
}X=c-b;
var d=Math.cos(b),v=Math.sin(b),f=Math.cos(c),w=Math.sin(c),r=Math.tan(X/4),o=4/3*K*r,q=4/3*M*r,h=[V,t],j=[V+o*v,t-q*d],k=[W+o*w,u-q*f],m=[W,u];
j[0]=2*h[0]-j[0];
j[1]=2*h[1]-j[1];
if(T){return[j,k,m][As](G)
}else{G=[j,k,m][As](G)[BA](",")[AD](",");
var I=[];
for(var l=0,H=G[AL];
l<H;
l++){I[l]=l%2?x(G[l-1],G[l],s).y:x(G[l],G[l+1],s).x
}return I
}},Aw=AX(function(U,V,C,F,T,A,P,Q,J){var M=Az(1-J,3)*U+Az(1-J,2)*3*J*C+(1-J)*3*J*J*T+Az(J,3)*P,O=Az(1-J,3)*V+Az(1-J,2)*3*J*F+(1-J)*3*J*J*A+Az(J,3)*Q,H=U+2*J*(C-U)+J*J*(T-2*C+U),I=V+2*J*(F-V)+J*J*(A-2*F+V),D=C+2*J*(T-C)+J*J*(P-2*T+C),G=F+2*J*(A-F)+J*J*(Q-2*A+F),K=(1-J)*U+J*C,N=(1-J)*V+J*F,B=(1-J)*T+J*P,L=(1-J)*A+J*Q;
return{x:M,y:O,m:{x:H,y:I},n:{x:D,y:G},start:{x:K,y:N},end:{x:B,y:L}}
}),A8=AX(function(N,O,M,T,P,Q,C,G){var A=(P-2*M+N)-(C-2*P+M),D=2*(M-N)-2*(P-M),H=N-M,K=(-D+Math.sqrt(D*D-4*A*H))/2/A,J=(-D-Math.sqrt(D*D-4*A*H))/2/A,F=[O,G],B=[N,C],I=Aw(N,O,M,T,P,Q,C,G,K>0&&K<1?K:0),L=Aw(N,O,M,T,P,Q,C,G,J>0&&J<1?J:0);
B=B[As](I.x,L.x);
F=F[As](I.y,L.y);
A=(Q-2*T+O)-(G-2*Q+T);
D=2*(T-O)-2*(Q-T);
H=O-T;
K=(-D+Math.sqrt(D*D-4*A*H))/2/A;
J=(-D-Math.sqrt(D*D-4*A*H))/2/A;
I=Aw(N,O,M,T,P,Q,C,G,K>0&&K<1?K:0);
L=Aw(N,O,M,T,P,Q,C,G,J>0&&J<1?J:0);
B=B[As](I.x,L.x);
F=F[As](I.y,L.y);
return{min:{x:A3[An](0,B),y:A3[An](0,F)},max:{x:AP[An](0,B),y:AP[An](0,F)}}
}),e=AX(function(O,F){var K=AH(O),D=F&&AH(F),C={x:0,y:0,bx:0,by:0,X:0,Y:0,qx:null,qy:null},N={x:0,y:0,bx:0,by:0,X:0,Y:0,qx:null,qy:null},J=function(V,U){var Q,T;
if(!V){return["C",U.x,U.y,U.x,U.y,U.x,U.y]
}!(V[0] in {T:1,Q:1})&&(U.qx=U.qy=null);
switch(V[0]){case"M":U.X=V[1];
U.Y=V[2];
break;
case"A":V=["C"][As](R[An](0,[U.x,U.y][As](V.slice(1))));
break;
case"S":Q=U.x+(U.x-(U.bx||U.x));
T=U.y+(U.y-(U.by||U.y));
V=["C",Q,T][As](V.slice(1));
break;
case"T":U.qx=U.x+(U.x-(U.qx||U.x));
U.qy=U.y+(U.y-(U.qy||U.y));
V=["C"][As](A1(U.x,U.y,U.qx,U.qy,V[1],V[2]));
break;
case"Q":U.qx=V[1];
U.qy=V[2];
V=["C"][As](A1(U.x,U.y,V[1],V[2],V[3],V[4]));
break;
case"L":V=["C"][As](Al(U.x,U.y,V[1],V[2]));
break;
case"H":V=["C"][As](Al(U.x,U.y,V[1],U.y));
break;
case"V":V=["C"][As](Al(U.x,U.y,U.x,V[1]));
break;
case"Z":V=["C"][As](Al(U.x,U.y,U.X,U.Y));
break
}return V
},P=function(U,T){if(U[T][AL]>7){U[T].shift();
var Q=U[T];
while(Q[AL]){U.splice(T++,0,["C"][As](Q.splice(0,6)))
}U.splice(T,1);
B=AP(K[AL],D&&D[AL]||0)
}},M=function(Q,T,V,W,U){if(Q&&T&&Q[U][0]=="M"&&T[U][0]!="M"){T.splice(U,0,["M",W.x,W.y]);
V.bx=0;
V.by=0;
V.x=Q[U][1];
V.y=Q[U][2];
B=AP(K[AL],D&&D[AL]||0)
}};
for(var H=0,B=AP(K[AL],D&&D[AL]||0);
H<B;
H++){K[H]=J(K[H],C);
P(K,H);
D&&(D[H]=J(D[H],N));
D&&P(D,H);
M(K,D,C,N,H);
M(D,K,N,C,H);
var I=K[H],A=D&&D[H],L=I[AL],G=D&&A[AL];
C.x=I[L-2];
C.y=I[L-1];
C.bx=Ah(I[L-4])||C.x;
C.by=Ah(I[L-3])||C.y;
N.bx=D&&(Ah(A[G-4])||N.x);
N.by=D&&(Ah(A[G-3])||N.y);
N.x=D&&A[G-2];
N.y=D&&A[G-1]
}return D?[K,D]:K
},null,BC),AJ=AX(function(B){var C=[];
for(var H=0,A=B[AL];
H<A;
H++){var J={},D=B[H].match(/^([^:]*):?([\d\.]*)/);
J.color=AU.getRGB(D[1]);
if(J.color.error){return null
}J.color=J.color.hex;
D[2]&&(J.offset=D[2]+"%");
C[AQ](J)
}for(var H=1,A=C[AL]-1;
H<A;
H++){if(!C[H].offset){var K=Ah(C[H-1].offset||0),I=0;
for(var G=H+1;
G<A;
G++){if(C[G].offset){I=C[G].offset;
break
}}if(!I){I=100;
G=A
}I=Ah(I);
var F=(I-K)/(G-H+1);
for(;
H<G;
H++){K+=F;
C[H].offset=K+"%"
}}}return C
}),AT=function(){var D,B,A,C,F;
if(AU.is(arguments[0],"string")||AU.is(arguments[0],"object")){if(AU.is(arguments[0],"string")){D=E.getElementById(arguments[0])
}else{D=arguments[0]
}if(D.tagName){if(arguments[1]==null){return{container:D,width:D.style.pixelWidth||D.offsetWidth,height:D.style.pixelHeight||D.offsetHeight}
}else{return{container:D,width:arguments[1],height:arguments[2]}
}}}else{if(AU.is(arguments[0],AW)&&arguments[AL]>3){return{container:1,x:arguments[0],y:arguments[1],width:arguments[2],height:arguments[3]}
}}},A5=function(D,C){var A=this;
for(var B in C){if(C[Ao](B)&&!(B in D)){switch(typeof C[B]){case"function":(function(F){D[B]=D===A?F:function(){return F[An](A,arguments)
}
})(C[B]);
break;
case"object":D[B]=D[B]||{};
A5.call(this,D[B],C[B]);
break;
default:D[B]=C[B];
break
}}}};
if(AU.svg){Ax.svgns="http://www.w3.org/2000/svg";
Ax.xlink="http://www.w3.org/1999/xlink";
var At=function(A){return +A+(~~A===A)*0.5
};
var Ai=function(D){for(var C=0,B=D[AL];
C<B;
C++){if(D[C][0].toLowerCase()!="a"){for(var F=1,A=D[C][AL];
F<A;
F++){D[C][F]=At(D[C][F])
}}else{D[C][6]=At(D[C][6]);
D[C][7]=At(D[C][7])
}}return D
};
var A2=function(B,C){if(C){for(var A in C){if(C[Ao](A)){B[AG](A,C[A])
}}}else{return E.createElementNS(Ax.svgns,B)
}};
AU[A9]=function(){return"Your browser supports SVG.\nYou are running Rapha\u00ebl "+this.version
};
var AI=function(D,B){var A=A2("path");
B.canvas&&B.canvas[A0](A);
var C=new BB(A,B);
C.type="path";
Ae(C,{fill:"none",stroke:"#000",path:D});
return C
};
var AR=function(M,B,N){var F="linear",I=0.5,L=0.5,P=M.style;
B=(B+BE)[Ay](/^r(?:\(([^,]+?)\s*,\s*([^\)]+?)\))?/,function(U,Q,T){F="radial";
if(Q&&T){I=Ah(Q);
L=Ah(T);
if(Az(I-0.5,2)+Az(L-0.5,2)>0.25){L=Math.sqrt(0.25-Az(I-0.5,2))+0.5
}}return BE
});
B=B[AD](/\s*\-\s*/);
if(F=="linear"){var K=B.shift();
K=-Ah(K);
if(isNaN(K)){return null
}var J=[0,0,Math.cos(K*Math.PI/180),Math.sin(K*Math.PI/180)],C=1/(AP(Math.abs(J[2]),Math.abs(J[3]))||1);
J[2]*=C;
J[3]*=C;
if(J[2]<0){J[0]=-J[2];
J[2]=0
}if(J[3]<0){J[1]=-J[3];
J[3]=0
}}var G=AJ(B);
if(!G){return null
}var O=A2(F+"Gradient");
O.id="r"+(AU._id++)[A9](36);
F=="radial"?A2(O,{fx:I,fy:L}):A2(O,{x1:J[0],y1:J[1],x2:J[2],y2:J[3]});
N.defs[A0](O);
for(var H=0,A=G[AL];
H<A;
H++){var D=A2("stop");
A2(D,{offset:G[H].offset?G[H].offset:!H?"0%":"100%","stop-color":G[H].color||"#fff"});
O[A0](D)
}A2(M,{fill:"url(#"+O.id+")",opacity:1,"fill-opacity":1});
P.fill=BE;
P.opacity=1;
P.fillOpacity=1;
return 1
};
var Av=function(A){var B=A.getBBox();
A2(A.pattern,{patternTransform:AU.format("translate({0},{1})",B.x,B.y)})
};
var Ae=function(N,D){var K={"":[0],none:[0],"-":[3,1],".":[1,1],"-.":[3,1,1,1],"-..":[3,1,1,1,1,1],". ":[1,3],"- ":[4,3],"--":[8,3],"- .":[4,3,1,3],"--.":[8,3,1,3],"--..":[8,3,1,3,1,3]},I=N.node,M=N.attrs,T=N.rotate(),W=function(b,c){c=K[(c+BE).toLowerCase()];
if(c){var f=b.attrs["stroke-width"]||"1",a={round:f,square:f,butt:0}[b.attrs["stroke-linecap"]||D["stroke-linecap"]]||0,d=[];
var Z=c[AL];
while(Z--){d[Z]=c[Z]*f+((Z%2)?1:-1)*a
}A2(I,{"stroke-dasharray":d[BA](",")})
}};
Ah(T)&&N.rotate(0,true);
for(var J in D){if(D[Ao](J)){if(!(J in AN)){continue
}var L=D[J];
M[J]=L;
switch(J){case"href":case"title":case"target":var G=I.parentNode;
if(G.tagName.toLowerCase()!="a"){var B=A2("a");
G.insertBefore(B,I);
B[A0](I);
G=B
}G.setAttributeNS(N.paper.xlink,J,L);
break;
case"clip-rect":var X=(L+BE)[AD](AS);
if(X[AL]==4){N.clip&&N.clip.parentNode.parentNode.removeChild(N.clip.parentNode);
var P=A2("clipPath"),H=A2("rect");
P.id="r"+(AU._id++)[A9](36);
A2(H,{x:X[0],y:X[1],width:X[2],height:X[3]});
P[A0](H);
N.paper.defs[A0](P);
A2(I,{"clip-path":"url(#"+P.id+")"});
N.clip=H
}if(!L){var F=E.getElementById(I.getAttribute("clip-path")[Ay](/(^url\(#|\)$)/g,BE));
F&&F.parentNode.removeChild(F);
A2(I,{"clip-path":BE});
delete N.clip
}break;
case"path":if(L&&N.type=="path"){M.path=Ai(AH(L));
A2(I,{d:M.path})
}break;
case"width":I[AG](J,L);
if(M.fx){J="x";
L=M.x
}else{break
}case"x":if(M.fx){L=-M.x-(M.width||0)
}case"rx":if(J=="rx"&&N.type=="rect"){break
}case"cx":I[AG](J,At(L));
N.pattern&&Av(N);
break;
case"height":I[AG](J,L);
if(M.fy){J="y";
L=M.y
}else{break
}case"y":if(M.fy){L=-M.y-(M.height||0)
}case"ry":if(J=="ry"&&N.type=="rect"){break
}case"cy":I[AG](J,At(L));
N.pattern&&Av(N);
break;
case"r":if(N.type=="rect"){A2(I,{rx:L,ry:L})
}else{I[AG](J,L)
}break;
case"src":if(N.type=="image"){I.setAttributeNS(N.paper.xlink,"href",L)
}break;
case"stroke-width":I.style.strokeWidth=L;
I[AG](J,L);
if(M["stroke-dasharray"]){W(N,M["stroke-dasharray"])
}break;
case"stroke-dasharray":W(N,L);
break;
case"rotation":T=L;
N.rotate(L,true);
break;
case"translation":var V=(L+BE)[AD](AS);
N.translate((+V[0]+1||2)-1,(+V[1]+1||2)-1);
break;
case"scale":var V=(L+BE)[AD](AS);
N.scale(+V[0]||1,+V[1]||+V[0]||1,+V[2]||null,+V[3]||null);
break;
case"fill":var A=(L+BE).match(/^url\(['"]?([^\)]+)['"]?\)$/i);
if(A){var P=A2("pattern"),O=A2("image");
P.id="r"+(AU._id++)[A9](36);
A2(P,{x:0,y:0,patternUnits:"userSpaceOnUse"});
A2(O,{x:0,y:0});
O.setAttributeNS(N.paper.xlink,"href",A[1]);
P[A0](O);
var C=E.createElement("img");
C.style.cssText="position:absolute;left:-9999em;top-9999em";
C.onload=function(){A2(P,{width:this.offsetWidth,height:this.offsetHeight});
A2(O,{width:this.offsetWidth,height:this.offsetHeight});
E.body.removeChild(this);
Ax.safari()
};
E.body[A0](C);
C.src=A[1];
N.paper.defs[A0](P);
I.style.fill="url(#"+P.id+")";
A2(I,{fill:"url(#"+P.id+")"});
N.pattern=P;
N.pattern&&Av(N);
break
}if(!AU.getRGB(L).error){delete D.gradient;
delete M.gradient;
if(!AU.is(M.opacity,"undefined")&&AU.is(D.opacity,"undefined")){I.style.opacity=M.opacity;
A2(I,{opacity:M.opacity})
}if(!AU.is(M["fill-opacity"],"undefined")&&AU.is(D["fill-opacity"],"undefined")){I.style.fillOpacity=M["fill-opacity"];
A2(I,{"fill-opacity":M["fill-opacity"]})
}}else{if((N.type in {circle:1,ellipse:1}||(L+BE).charAt(0)!="r")&&AR(I,L,N.paper)){M.gradient=L;
M.fill="none";
break
}}case"stroke":I.style[J]=AU.getRGB(L).hex;
I[AG](J,AU.getRGB(L).hex);
break;
case"gradient":(N.type in {circle:1,ellipse:1}||(L+BE).charAt(0)!="r")&&AR(I,L,N.paper);
break;
case"opacity":case"fill-opacity":if(M.gradient){var Y=E.getElementById(I.getAttribute("fill")[Ay](/^url\(#|\)$/g,BE));
if(Y){var U=Y.getElementsByTagName("stop");
U[U[AL]-1][AG]("stop-opacity",L)
}break
}default:J=="font-size"&&(L=i(L,10)+"px");
var Q=J[Ay](/(\-.)/g,function(Z){return Z.substring(1).toUpperCase()
});
I.style[Q]=L;
I[AG](J,L);
break
}}}AB(N,D);
Ah(T)&&N.rotate(T,true)
};
var AO=1.2;
var AB=function(K,H){if(K.type!="text"||!("text" in H||"font" in H||"font-size" in H||"x" in H||"y" in H)){return 
}var C=K.attrs,L=K.node,A=L.firstChild?i(E.defaultView.getComputedStyle(L.firstChild,BE).getPropertyValue("font-size"),10):10;
if("text" in H){while(L.firstChild){L.removeChild(L.firstChild)
}var J=(H.text+BE)[AD]("\n");
for(var I=0,B=J[AL];
I<B;
I++){var F=A2("tspan");
I&&A2(F,{dy:A*AO,x:C.x});
F[A0](E.createTextNode(J[I]));
L[A0](F)
}}else{var J=L.getElementsByTagName("tspan");
for(var I=0,B=J[AL];
I<B;
I++){I&&A2(J[I],{dy:A*AO,x:C.x})
}}A2(L,{y:C.y});
var G=K.getBBox(),D=C.y-(G.y+G.height/2);
D&&isFinite(D)&&A2(L,{y:C.y+D})
};
var BB=function(A,D){var B=0,C=0;
this[0]=A;
this.id=AU._oid++;
this.node=A;
A.raphael=this;
this.paper=D;
this.attrs=this.attrs||{};
this.transformations=[];
this._={tx:0,ty:0,rt:{deg:0,cx:0,cy:0},sx:1,sy:1}
};
BB[Aj].rotate=function(A,D,B){if(this.removed){return this
}if(A==null){if(this._.rt.cx){return[this._.rt.deg,this._.rt.cx,this._.rt.cy][BA](AV)
}return this._.rt.deg
}var C=this.getBBox();
A=(A+BE)[AD](AS);
if(A[AL]-1){D=Ah(A[1]);
B=Ah(A[2])
}A=Ah(A[0]);
if(D!=null){this._.rt.deg=A
}else{this._.rt.deg+=A
}(B==null)&&(D=null);
this._.rt.cx=D;
this._.rt.cy=B;
D=D==null?C.x+C.width/2:D;
B=B==null?C.y+C.height/2:B;
if(this._.rt.deg){this.transformations[0]=AU.format("rotate({0} {1} {2})",this._.rt.deg,D,B);
this.clip&&A2(this.clip,{transform:AU.format("rotate({0} {1} {2})",-this._.rt.deg,D,B)})
}else{this.transformations[0]=BE;
this.clip&&A2(this.clip,{transform:BE})
}A2(this.node,{transform:this.transformations[BA](AV)});
return this
};
BB[Aj].hide=function(){!this.removed&&(this.node.style.display="none");
return this
};
BB[Aj].show=function(){!this.removed&&(this.node.style.display="");
return this
};
BB[Aj].remove=function(){this.node.parentNode.removeChild(this.node);
for(var A in this){delete this[A]
}this.removed=true
};
BB[Aj].getBBox=function(){if(this.removed){return this
}if(this.type=="path"){return Ak(this.attrs.path)
}if(this.node.style.display=="none"){this.show();
var C=true
}var B={};
try{B=this.node.getBBox()
}catch(G){}finally{B=B||{}
}if(this.type=="text"){B={x:B.x,y:Infinity,width:0,height:0};
for(var F=0,A=this.node.getNumberOfChars();
F<A;
F++){var D=this.node.getExtentOfChar(F);
(D.y<B.y)&&(B.y=D.y);
(D.y+D.height-B.y>B.height)&&(B.height=D.y+D.height-B.y);
(D.x+D.width-B.x>B.width)&&(B.width=D.x+D.width-B.x)
}}C&&this.hide();
return B
};
BB[Aj].attr=function(){if(this.removed){return this
}if(arguments[AL]==1&&AU.is(arguments[0],"string")){if(arguments[0]=="translation"){return this.translate()
}if(arguments[0]=="rotation"){return this.rotate()
}if(arguments[0]=="scale"){return this.scale()
}return this.attrs[arguments[0]]
}if(arguments[AL]==1&&AU.is(arguments[0],"array")){var C={};
for(var A in arguments[0]){if(arguments[0][Ao](A)){C[arguments[0][A]]=this.attrs[arguments[0][A]]
}}return C
}if(arguments[AL]==2){var B={};
B[arguments[0]]=arguments[1];
Ae(this,B)
}else{if(arguments[AL]==1&&AU.is(arguments[0],"object")){Ae(this,arguments[0])
}}return this
};
BB[Aj].toFront=function(){!this.removed&&this.node.parentNode[A0](this.node);
return this
};
BB[Aj].toBack=function(){if(this.removed){return this
}if(this.node.parentNode.firstChild!=this.node){this.node.parentNode.insertBefore(this.node,this.node.parentNode.firstChild)
}return this
};
BB[Aj].insertAfter=function(A){if(this.removed){return this
}if(A.node.nextSibling){A.node.parentNode.insertBefore(this.node,A.node.nextSibling)
}else{A.node.parentNode[A0](this.node)
}return this
};
BB[Aj].insertBefore=function(B){if(this.removed){return this
}var A=B.node;
A.parentNode.insertBefore(this.node,A);
return this
};
var Ar=function(B,G,F,A){G=At(G);
F=At(F);
var C=A2("circle");
B.canvas&&B.canvas[A0](C);
var D=new BB(C,B);
D.attrs={cx:G,cy:F,r:A,fill:"none",stroke:"#000"};
D.type="circle";
A2(C,D.attrs);
return D
};
var A6=function(H,I,D,B,G,F){I=At(I);
D=At(D);
var A=A2("rect");
H.canvas&&H.canvas[A0](A);
var C=new BB(A,H);
C.attrs={x:I,y:D,width:B,height:G,r:F||0,rx:F||0,ry:F||0,fill:"none",stroke:"#000"};
C.type="rect";
A2(A,C.attrs);
return C
};
var AY=function(B,H,D,G,A){H=At(H);
D=At(D);
var C=A2("ellipse");
B.canvas&&B.canvas[A0](C);
var F=new BB(C,B);
F.attrs={cx:H,cy:D,rx:G,ry:A,fill:"none",stroke:"#000"};
F.type="ellipse";
A2(C,F.attrs);
return F
};
var AK=function(H,F,I,D,B,G){var A=A2("image");
A2(A,{x:I,y:D,width:B,height:G,preserveAspectRatio:"none"});
A.setAttributeNS(H.xlink,"href",F);
H.canvas&&H.canvas[A0](A);
var C=new BB(A,H);
C.attrs={x:I,y:D,width:B,height:G,src:F};
C.type="image";
return C
};
var Ag=function(B,G,F,A){var C=A2("text");
A2(C,{x:G,y:F,"text-anchor":"middle"});
B.canvas&&B.canvas[A0](C);
var D=new BB(C,B);
D.attrs={x:G,y:F,"text-anchor":"middle",text:A,font:AN.font,stroke:"none",fill:"#000"};
D.type="text";
Ae(D,D.attrs);
return D
};
var Ap=function(A,B){this.width=A||this.width;
this.height=B||this.height;
this.canvas[AG]("width",this.width);
this.canvas[AG]("height",this.height);
return this
};
var AF=function(){var D=AT[An](null,arguments),H=D&&D.container,B=D.x,C=D.y,A=D.width,I=D.height;
if(!H){throw new Error("SVG container not found.")
}Ax.canvas=A2("svg");
var F=Ax.canvas;
Ax.width=A||512;
Ax.height=I||342;
F[AG]("width",Ax.width);
F[AG]("height",Ax.height);
if(H==1){F.style.cssText="position:absolute;left:"+B+"px;top:"+C+"px";
E.body[A0](F)
}else{if(H.firstChild){H.insertBefore(F,H.firstChild)
}else{H[A0](F)
}}H={canvas:F};
for(var G in Ax){if(Ax[Ao](G)){H[G]=Ax[G]
}}A5.call(H,H,AU.fn);
H.clear();
H.raphael=AU;
return H
};
Ax.clear=function(){var A=this.canvas;
while(A.firstChild){A.removeChild(A.firstChild)
}(this.desc=A2("desc"))[A0](E.createTextNode("Created with Rapha\u00ebl"));
A[A0](this.desc);
A[A0](this.defs=A2("defs"))
};
Ax.remove=function(){this.canvas.parentNode&&this.canvas.parentNode.removeChild(this.canvas);
for(var A in this){delete this[A]
}}
}if(AU.vml){var A4=function(A){var D=/[ahqtv]/ig,J=AH;
(A+BE).match(D)&&(J=e);
D=/[clmz]/g;
if(J==AH&&!(A+BE).match(D)){var O={M:"m",L:"l",C:"c",Z:"x",m:"t",l:"r",c:"v",z:"x"},K=/([clmz]),?([^clmz]*)/gi,M=/-?[^,\s-]+/g;
var F=(A+BE)[Ay](K,function(U,Q,P){var T=[];
P[Ay](M,function(V){T[AQ](At(V))
});
return O[Q]+T
});
return F
}var C=J(A),L,F=[],N;
for(var H=0,B=C[AL];
H<B;
H++){L=C[H];
N=(C[H][0]+BE).toLowerCase();
N=="z"&&(N="x");
for(var I=1,G=L[AL];
I<G;
I++){N+=At(L[I])+(I!=G-1?",":BE)
}F[AQ](N)
}return F[BA](AV)
};
AU[A9]=function(){return"Your browser doesn\u2019t support SVG. Falling down to VML.\nYou are running Rapha\u00ebl "+this.version
};
var AI=function(G,F){var C=AZ("group");
C.style.cssText="position:absolute;left:0;top:0;width:"+F.width+"px;height:"+F.height+"px";
C.coordsize=F.coordsize;
C.coordorigin=F.coordorigin;
var D=AZ("shape"),B=D.style;
B.width=F.width+"px";
B.height=F.height+"px";
D.coordsize=this.coordsize;
D.coordorigin=this.coordorigin;
C[A0](D);
var A=new BB(D,C,F);
A.isAbsolute=true;
A.type="path";
A.path=[];
A.Path=BE;
G&&Ae(A,{fill:"none",stroke:"#000",path:G});
F.canvas[A0](C);
return A
};
var Ae=function(N,I){N.attrs=N.attrs||{};
var K=N.node,H=N.attrs,Q=K.style,B,C=N;
for(var P in I){if(I[Ao](P)){H[P]=I[P]
}}I.href&&(K.href=I.href);
I.title&&(K.title=I.title);
I.target&&(K.target=I.target);
if(I.path&&N.type=="path"){H.path=I.path;
K.path=A4(H.path)
}if(I.rotation!=null){N.rotate(I.rotation,true)
}if(I.translation){B=(I.translation+BE)[AD](AS);
N.translate(B[0],B[1])
}if(I.scale){B=(I.scale+BE)[AD](AS);
N.scale(+B[0]||1,+B[1]||+B[0]||1,+B[2]||null,+B[3]||null)
}if("clip-rect" in I){var V=(I["clip-rect"]+BE)[AD](AS);
if(V[AL]==4){V[2]=+V[2]+(+V[0]);
V[3]=+V[3]+(+V[1]);
var O=K.clipRect||E.createElement("div"),D=O.style,T=K.parentNode;
D.clip=AU.format("rect({1}px {2}px {3}px {0}px)",V);
if(!K.clipRect){D.position="absolute";
D.top=0;
D.left=0;
D.width=N.paper.width+"px";
D.height=N.paper.height+"px";
T.parentNode.insertBefore(O,T);
O[A0](T);
K.clipRect=O
}}if(!I["clip-rect"]){K.clipRect&&(K.clipRect.style.clip=BE)
}}if(N.type=="image"&&I.src){K.src=I.src
}if(N.type=="image"&&I.opacity){K.filterOpacity=" progid:DXImageTransform.Microsoft.Alpha(opacity="+(I.opacity*100)+")";
Q.filter=(K.filterMatrix||BE)+(K.filterOpacity||BE)
}I.font&&(Q.font=I.font);
I["font-family"]&&(Q.fontFamily='"'+I["font-family"][AD](",")[0][Ay](/^['"]+|['"]+$/g,BE)+'"');
I["font-size"]&&(Q.fontSize=I["font-size"]);
I["font-weight"]&&(Q.fontWeight=I["font-weight"]);
I["font-style"]&&(Q.fontStyle=I["font-style"]);
if(I.opacity!=null||I["stroke-width"]!=null||I.fill!=null||I.stroke!=null||I["stroke-width"]!=null||I["stroke-opacity"]!=null||I["fill-opacity"]!=null||I["stroke-dasharray"]!=null||I["stroke-miterlimit"]!=null||I["stroke-linejoin"]!=null||I["stroke-linecap"]!=null){K=N.shape||K;
var J=(K.getElementsByTagName("fill")&&K.getElementsByTagName("fill")[0]),G=false;
!J&&(G=J=AZ("fill"));
if("fill-opacity" in I||"opacity" in I){var U=((+H["fill-opacity"]+1||2)-1)*((+H.opacity+1||2)-1);
U<0&&(U=0);
U>1&&(U=1);
J.opacity=U
}I.fill&&(J.on=true);
if(J.on==null||I.fill=="none"){J.on=false
}if(J.on&&I.fill){var M=I.fill.match(/^url\(([^\)]+)\)$/i);
if(M){J.src=M[1];
J.type="tile"
}else{J.color=AU.getRGB(I.fill).hex;
J.src=BE;
J.type="solid";
if(AU.getRGB(I.fill).error&&(C.type in {circle:1,ellipse:1}||(I.fill+BE).charAt(0)!="r")&&AR(C,I.fill)){H.fill="none";
H.gradient=I.fill
}}}G&&K[A0](J);
var A=(K.getElementsByTagName("stroke")&&K.getElementsByTagName("stroke")[0]),F=false;
!A&&(F=A=AZ("stroke"));
if((I.stroke&&I.stroke!="none")||I["stroke-width"]||I["stroke-opacity"]!=null||I["stroke-dasharray"]||I["stroke-miterlimit"]||I["stroke-linejoin"]||I["stroke-linecap"]){A.on=true
}(I.stroke=="none"||A.on==null||I.stroke==0||I["stroke-width"]==0)&&(A.on=false);
A.on&&I.stroke&&(A.color=AU.getRGB(I.stroke).hex);
var U=((+H["stroke-opacity"]+1||2)-1)*((+H.opacity+1||2)-1);
U<0&&(U=0);
U>1&&(U=1);
A.opacity=U;
I["stroke-linejoin"]&&(A.joinstyle=I["stroke-linejoin"]||"miter");
A.miterlimit=I["stroke-miterlimit"]||8;
I["stroke-linecap"]&&(A.endcap={butt:"flat",square:"square",round:"round"}[I["stroke-linecap"]]||"miter");
I["stroke-width"]&&(A.weight=(Ah(I["stroke-width"])||1)*12/16);
if(I["stroke-dasharray"]){var L={"-":"shortdash",".":"shortdot","-.":"shortdashdot","-..":"shortdashdotdot",". ":"dot","- ":"dash","--":"longdash","- .":"dashdot","--.":"longdashdot","--..":"longdashdotdot"};
A.dashstyle=L[I["stroke-dasharray"]]||BE
}F&&K[A0](A)
}if(C.type=="text"){var Q=C.paper.span.style;
H.font&&(Q.font=H.font);
H["font-family"]&&(Q.fontFamily=H["font-family"]);
H["font-size"]&&(Q.fontSize=H["font-size"]);
H["font-weight"]&&(Q.fontWeight=H["font-weight"]);
H["font-style"]&&(Q.fontStyle=H["font-style"]);
C.node.string&&(C.paper.span.innerHTML=(C.node.string+BE)[Ay](/</g,"&#60;")[Ay](/&/g,"&#38;")[Ay](/\n/g,"<br>"));
C.W=H.w=C.paper.span.offsetWidth;
C.H=H.h=C.paper.span.offsetHeight;
C.X=H.x;
C.Y=H.y+At(C.H/2);
switch(H["text-anchor"]){case"start":C.node.style["v-text-align"]="left";
C.bbx=At(C.W/2);
break;
case"end":C.node.style["v-text-align"]="right";
C.bbx=-At(C.W/2);
break;
default:C.node.style["v-text-align"]="center";
break
}}};
var AR=function(K,F){K.attrs=K.attrs||{};
var D=K.attrs,B=K.node.getElementsByTagName("fill"),J="linear",G=".5 .5";
K.attrs.gradient=F;
F=(F+BE)[Ay](/^r(?:\(([^,]+?)\s*,\s*([^\)]+?)\))?/,function(M,O,N){J="radial";
if(O&&N){O=Ah(O);
N=Ah(N);
if(Az(O-0.5,2)+Az(N-0.5,2)>0.25){N=Math.sqrt(0.25-Az(O-0.5,2))+0.5
}G=O+AV+N
}return BE
});
F=F[AD](/\s*\-\s*/);
if(J=="linear"){var L=F.shift();
L=-Ah(L);
if(isNaN(L)){return null
}}var H=AJ(F);
if(!H){return null
}K=K.shape||K.node;
B=B[0]||AZ("fill");
if(H[AL]){B.on=true;
B.method="none";
B.type=(J=="radial")?"gradientradial":"gradient";
B.color=H[0].color;
B.color2=H[H[AL]-1].color;
var A=[];
for(var I=0,C=H[AL];
I<C;
I++){H[I].offset&&A[AQ](H[I].offset+AV+H[I].color)
}B.colors.value=A[AL]?A[BA](","):"0% "+B.color;
if(J=="radial"){B.focus="100%";
B.focussize=G;
B.focusposition=G
}else{B.angle=(270-L)%360
}}return 1
};
var BB=function(B,D,H){var G=0,F=0,A=0,C=1;
this[0]=B;
this.id=AU._oid++;
this.node=B;
B.raphael=this;
this.X=0;
this.Y=0;
this.attrs={};
this.Group=D;
this.paper=H;
this._={tx:0,ty:0,rt:{deg:0},sx:1,sy:1}
};
BB[Aj].rotate=function(A,C,B){if(this.removed){return this
}if(A==null){if(this._.rt.cx){return[this._.rt.deg,this._.rt.cx,this._.rt.cy][BA](AV)
}return this._.rt.deg
}A=(A+BE)[AD](AS);
if(A[AL]-1){C=Ah(A[1]);
B=Ah(A[2])
}A=Ah(A[0]);
if(C!=null){this._.rt.deg=A
}else{this._.rt.deg+=A
}B==null&&(C=null);
this._.rt.cx=C;
this._.rt.cy=B;
this.setBox(this.attrs,C,B);
this.Group.style.rotation=this._.rt.deg;
return this
};
BB[Aj].setBox=function(M,J,K){if(this.removed){return this
}var Q=this.Group.style,I=(this.shape&&this.shape.style)||this.node.style;
M=M||{};
for(var H in M){if(M[Ao](H)){this.attrs[H]=M[H]
}}J=J||this._.rt.cx;
K=K||this._.rt.cy;
var D=this.attrs,A,B,P,F;
switch(this.type){case"circle":A=D.cx-D.r;
B=D.cy-D.r;
P=F=D.r*2;
break;
case"ellipse":A=D.cx-D.rx;
B=D.cy-D.ry;
P=D.rx*2;
F=D.ry*2;
break;
case"rect":case"image":A=+D.x;
B=+D.y;
P=D.width||0;
F=D.height||0;
break;
case"text":this.textpath.v=["m",At(D.x),", ",At(D.y-2),"l",At(D.x)+1,", ",At(D.y-2)][BA](BE);
A=D.x-At(this.W/2);
B=D.y-this.H/2;
P=this.W;
F=this.H;
break;
case"path":if(!this.attrs.path){A=0;
B=0;
P=this.paper.width;
F=this.paper.height
}else{var G=Ak(this.attrs.path);
A=G.x;
B=G.y;
P=G.width;
F=G.height
}break;
default:A=0;
B=0;
P=this.paper.width;
F=this.paper.height;
break
}J=(J==null)?A+P/2:J;
K=(K==null)?B+F/2:K;
var L=J-this.paper.width/2,C=K-this.paper.height/2;
if(this.type=="path"||this.type=="text"){(Q.left!=L+"px")&&(Q.left=L+"px");
(Q.top!=C+"px")&&(Q.top=C+"px");
this.X=this.type=="text"?A:-L;
this.Y=this.type=="text"?B:-C;
this.W=P;
this.H=F;
(I.left!=-L+"px")&&(I.left=-L+"px");
(I.top!=-C+"px")&&(I.top=-C+"px")
}else{(Q.left!=L+"px")&&(Q.left=L+"px");
(Q.top!=C+"px")&&(Q.top=C+"px");
this.X=A;
this.Y=B;
this.W=P;
this.H=F;
(Q.width!=this.paper.width+"px")&&(Q.width=this.paper.width+"px");
(Q.height!=this.paper.height+"px")&&(Q.height=this.paper.height+"px");
(I.left!=A-L+"px")&&(I.left=A-L+"px");
(I.top!=B-C+"px")&&(I.top=B-C+"px");
(I.width!=P+"px")&&(I.width=P+"px");
(I.height!=F+"px")&&(I.height=F+"px");
var O=(+M.r||0)/(A3(P,F));
if(this.type=="rect"&&this.arcsize!=O&&(O||this.arcsize)){var N=AZ(O?"roundrect":"rect");
N.arcsize=O;
this.Group[A0](N);
this.node.parentNode.removeChild(this.node);
this.node=N;
this.arcsize=O;
this.attr(this.attrs)
}}};
BB[Aj].hide=function(){!this.removed&&(this.Group.style.display="none");
return this
};
BB[Aj].show=function(){!this.removed&&(this.Group.style.display="block");
return this
};
BB[Aj].getBBox=function(){if(this.removed){return this
}if(this.type=="path"){return Ak(this.attrs.path)
}return{x:this.X+(this.bbx||0),y:this.Y,width:this.W,height:this.H}
};
BB[Aj].remove=function(){this.node.parentNode.removeChild(this[0]);
this.Group.parentNode.removeChild(this.Group);
this.shape&&this.shape.parentNode.removeChild(this.shape);
for(var A in this){delete this[A]
}this.removed=true
};
BB[Aj].attr=function(){if(this.removed){return this
}if(arguments[AL]==1&&AU.is(arguments[0],"string")){if(arguments[0]=="translation"){return this.translate()
}if(arguments[0]=="rotation"){return this.rotate()
}if(arguments[0]=="scale"){return this.scale()
}return this.attrs[arguments[0]]
}if(this.attrs&&arguments[AL]==1&&AU.is(arguments[0],"array")){var D={};
for(var C=0,B=arguments[0][AL];
C<B;
C++){D[arguments[0][C]]=this.attrs[arguments[0][C]]
}return D
}var A;
if(arguments[AL]==2){A={};
A[arguments[0]]=arguments[1]
}arguments[AL]==1&&AU.is(arguments[0],"object")&&(A=arguments[0]);
if(A){if(A.text&&this.type=="text"){this.node.string=A.text
}Ae(this,A);
if(A.gradient&&({circle:1,ellipse:1}[Ao](this.type)||(A.gradient+BE).charAt(0)!="r")){AR(this,A.gradient)
}this.setBox(this.attrs)
}return this
};
BB[Aj].toFront=function(){!this.removed&&this.Group.parentNode[A0](this.Group);
return this
};
BB[Aj].toBack=function(){if(this.removed){return this
}if(this.Group.parentNode.firstChild!=this.Group){this.Group.parentNode.insertBefore(this.Group,this.Group.parentNode.firstChild)
}return this
};
BB[Aj].insertAfter=function(A){if(this.removed){return this
}if(A.Group.nextSibling){A.Group.parentNode.insertBefore(this.Group,A.Group.nextSibling)
}else{A.Group.parentNode[A0](this.Group)
}return this
};
BB[Aj].insertBefore=function(A){!this.removed&&A.Group.parentNode.insertBefore(this.Group,A.Group);
return this
};
var Ar=function(B,I,D,H){var A=AZ("group"),F=AZ("oval"),G=F.style;
A.style.cssText="position:absolute;left:0;top:0;width:"+B.width+"px;height:"+B.height+"px";
A.coordsize=B.coordsize;
A.coordorigin=B.coordorigin;
A[A0](F);
var C=new BB(F,A,B);
C.type="circle";
Ae(C,{stroke:"#000",fill:"none"});
C.attrs.cx=I;
C.attrs.cy=D;
C.attrs.r=H;
C.setBox({x:I-H,y:D-H,width:H*2,height:H*2});
B.canvas[A0](A);
return C
};
var A6=function(I,C,D,B,H,J){var F=AZ("group"),K=AZ(J?"roundrect":"rect"),A=(+J||0)/(A3(B,H));
K.arcsize=A;
F.style.cssText="position:absolute;left:0;top:0;width:"+I.width+"px;height:"+I.height+"px";
F.coordsize=I.coordsize;
F.coordorigin=I.coordorigin;
F[A0](K);
var G=new BB(K,F,I);
G.type="rect";
Ae(G,{stroke:"#000"});
G.arcsize=A;
G.setBox({x:C,y:D,width:B,height:H,r:+J});
I.canvas[A0](F);
return G
};
var AY=function(I,A,B,J,H){var D=AZ("group"),G=AZ("oval"),C=G.style;
D.style.cssText="position:absolute;left:0;top:0;width:"+I.width+"px;height:"+I.height+"px";
D.coordsize=I.coordsize;
D.coordorigin=I.coordorigin;
D[A0](G);
var F=new BB(G,D,I);
F.type="ellipse";
Ae(F,{stroke:"#000"});
F.attrs.cx=A;
F.attrs.cy=B;
F.attrs.rx=J;
F.attrs.ry=H;
F.setBox({x:A-J,y:B-H,width:J*2,height:H*2});
I.canvas[A0](D);
return F
};
var AK=function(I,J,B,C,A,H){var F=AZ("group"),K=AZ("image"),D=K.style;
F.style.cssText="position:absolute;left:0;top:0;width:"+I.width+"px;height:"+I.height+"px";
F.coordsize=I.coordsize;
F.coordorigin=I.coordorigin;
K.src=J;
F[A0](K);
var G=new BB(K,F,I);
G.type="image";
G.attrs.src=J;
G.attrs.x=B;
G.attrs.y=C;
G.attrs.w=A;
G.attrs.h=H;
G.setBox({x:B,y:C,width:A,height:H});
I.canvas[A0](F);
return G
};
var Ag=function(J,C,D,B){var G=AZ("group"),I=AZ("shape"),F=I.style,A=AZ("path"),K=A.style,L=AZ("textpath");
G.style.cssText="position:absolute;left:0;top:0;width:"+J.width+"px;height:"+J.height+"px";
G.coordsize=J.coordsize;
G.coordorigin=J.coordorigin;
A.v=AU.format("m{0},{1}l{2},{1}",At(C),At(D),At(C)+1);
A.textpathok=true;
F.width=J.width;
F.height=J.height;
L.string=B+BE;
L.on=true;
I[A0](L);
I[A0](A);
G[A0](I);
var H=new BB(L,G,J);
H.shape=I;
H.textpath=A;
H.type="text";
H.attrs.text=B;
H.attrs.x=C;
H.attrs.y=D;
H.attrs.w=1;
H.attrs.h=1;
Ae(H,{font:AN.font,stroke:"none",fill:"#000"});
H.setBox();
J.canvas[A0](G);
return H
};
var Ap=function(B,C){var A=this.canvas.style;
this.width=Ah(B||this.width);
this.height=Ah(C||this.height);
A.width=this.width+"px";
A.height=this.height+"px";
A.clip="rect(0 "+this.width+"px "+this.height+"px 0)";
this.coordsize=this.width+AV+this.height;
return this
};
E.createStyleSheet().addRule(".rvml","behavior:url(#default#VML)");
try{!E.namespaces.rvml&&E.namespaces.add("rvml","urn:schemas-microsoft-com:vml");
var AZ=function(A){return E.createElement("<rvml:"+A+' class="rvml">')
}
}catch(Ab){var AZ=function(A){return E.createElement("<"+A+' xmlns="urn:schemas-microsoft.com:vml" class="rvml">')
}
}var AF=function(){var I=AT[An](null,arguments),J=I.container,B=I.height,A,L=I.width,C=I.x,D=I.y;
if(!J){throw new Error("VML container not found.")
}var H={},G=H.canvas=E.createElement("div"),F=G.style;
L=Ah(L)||512;
B=Ah(B)||342;
H.width=L;
H.height=B;
H.coordsize=L+AV+B;
H.coordorigin="0 0";
H.span=E.createElement("span");
H.span.style.cssText="position:absolute;left:-9999px;top:-9999px;padding:0;margin:0;line-height:1;display:inline;";
G[A0](H.span);
F.cssText=AU.format("width:{0}px;height:{1}px;position:absolute;clip:rect(0 {0}px {1}px 0)",L,B);
if(J==1){E.body[A0](G);
F.left=C+"px";
F.top=D+"px";
J={style:{width:L,height:B}}
}else{J.style.width=L;
J.style.height=B;
if(J.firstChild){J.insertBefore(G,J.firstChild)
}else{J[A0](G)
}}for(var K in Ax){if(Ax[Ao](K)){H[K]=Ax[K]
}}A5.call(H,H,AU.fn);
H.clear=function(){G.innerHTML=BE
};
H.raphael=AU;
return H
};
Ax.remove=function(){this.canvas.parentNode.removeChild(this.canvas);
for(var A in this){delete this[A]
}}
}if({"Apple Computer, Inc.":1,"Google Inc.":1}[navigator.vendor]){Ax.safari=function(){var A=this.rect(-99,-99,this.width+99,this.height+99);
setTimeout(function(){A.remove()
})
}
}else{Ax.safari=function(){}
}var Aa=(function(){if(E.addEventListener){return function(B,D,A,F){var C=function(G){return A.call(F,G)
};
B.addEventListener(D,C,false);
return function(){B.removeEventListener(D,C,false);
return true
}
}
}else{if(E.attachEvent){return function(F,C,D,B){var A=function(H){return D.call(B,H||BD.event)
};
F.attachEvent("on"+C,A);
var G=function(){F.detachEvent("on"+C,A);
return true
};
if(C=="mouseover"){F.attachEvent("onmouseenter",A);
return function(){F.detachEvent("onmouseenter",A);
return G()
}
}else{if(C=="mouseout"){F.attachEvent("onmouseleave",A);
return function(){F.detachEvent("onmouseleave",A);
return G()
}
}}return G
}
}}})();
for(var Ad=AA[AL];
Ad--;
){(function(A){BB[Aj][A]=function(B){if(AU.is(B,"function")){this.events=this.events||{};
this.events[A]=this.events[A]||{};
this.events[A][B]=this.events[A][B]||[];
this.events[A][B][AQ](Aa(this.shape||this.node,A,B,this))
}return this
};
BB[Aj]["un"+A]=function(B){var C=this.events;
C&&C[A]&&C[A][B]&&C[A][B][AL]&&C[A][B].shift()()&&!C[A][B][AL]&&delete C[A][B];
return this
}
})(AA[Ad])
}BB[Aj].hover=function(A,B){return this.mouseover(A).mouseout(B)
};
Ax.circle=function(C,B,A){return Ar(this,C||0,B||0,A||0)
};
Ax.rect=function(F,B,A,D,C){return A6(this,F||0,B||0,A||0,D||0,C||0)
};
Ax.ellipse=function(D,B,C,A){return AY(this,D||0,B||0,C||0,A||0)
};
Ax.path=function(A){A&&!AU.is(A,"string")&&!AU.is(A[0],"array")&&(A+=BE);
return AI(AU.format[An](AU,arguments),this)
};
Ax.image=function(C,F,B,A,D){return AK(this,C||"about:blank",F||0,B||0,A||0,D||0)
};
Ax.text=function(C,B,A){return Ag(this,C||0,B||0,A||BE)
};
Ax.set=function(A){arguments[AL]>1&&(A=Array[Aj].splice.call(arguments,0,arguments[AL]));
return new Am(A)
};
Ax.setSize=Ap;
BB[Aj].scale=function(V,W,K,Z){if(V==null&&W==null){return{x:this._.sx,y:this._.sy,toString:function(){return this.x+AV+this.y
}}
}W=W||V;
!+W&&(W=V);
var P,T,Q,U,A=this.attrs;
if(V!=0){var Y=this.getBBox(),c=Y.x+Y.width/2,g=Y.y+Y.height/2,B=V/this._.sx,C=W/this._.sy;
K=(+K||K==0)?K:c;
Z=(+Z||Z==0)?Z:g;
var a=~~(V/Math.abs(V)),d=~~(W/Math.abs(W)),M=this.node.style,j=K+(c-K)*a*B,k=Z+(g-Z)*d*C;
switch(this.type){case"rect":case"image":var b=A.width*a*B,N=A.height*d*C,X=A.r*A3(B,C),f=j-b/2,I=k-N/2;
this.attr({width:b,height:N,x:f,y:I,r:X});
break;
case"circle":case"ellipse":this.attr({rx:A.rx*B,ry:A.ry*C,r:A.r*A3(B,C),cx:j,cy:k});
break;
case"path":var J=Ac(A.path),H=true;
for(var F=0,O=J[AL];
F<O;
F++){var L=J[F];
if(L[0].toUpperCase()=="M"&&H){continue
}else{H=false
}if(AU.svg&&L[0].toUpperCase()=="A"){L[J[F][AL]-2]*=B;
L[J[F][AL]-1]*=C;
L[1]*=B;
L[2]*=C;
L[5]=+(a+d?!!+L[5]:!+L[5])
}else{for(var G=1,D=L[AL];
G<D;
G++){L[G]*=(G%2)?B:C
}}}var h=Ak(J),P=j-h.x-h.width/2,T=k-h.y-h.height/2;
J[0][1]+=P;
J[0][2]+=T;
this.attr({path:J});
break
}if(this.type in {text:1,image:1}&&(a!=1||d!=1)){if(this.transformations){this.transformations[2]="scale("[As](a,",",d,")");
this.node[AG]("transform",this.transformations[BA](AV));
P=(a==-1)?-A.x-(b||0):A.x;
T=(d==-1)?-A.y-(N||0):A.y;
this.attr({x:P,y:T});
A.fx=a-1;
A.fy=d-1
}else{this.node.filterMatrix=" progid:DXImageTransform.Microsoft.Matrix(M11="[As](a,", M12=0, M21=0, M22=",d,", Dx=0, Dy=0, sizingmethod='auto expand', filtertype='bilinear')");
M.filter=(this.node.filterMatrix||BE)+(this.node.filterOpacity||BE)
}}else{if(this.transformations){this.transformations[2]=BE;
this.node[AG]("transform",this.transformations[BA](AV));
A.fx=0;
A.fy=0
}else{this.node.filterMatrix=BE;
M.filter=(this.node.filterMatrix||BE)+(this.node.filterOpacity||BE)
}}A.scale=[V,W,K,Z][BA](AV);
this._.sx=V;
this._.sy=W
}return this
};
AU.easing_formulas={linear:function(A){return A
},"<":function(A){return Az(A,3)
},">":function(A){return Az(A-1,3)+1
},"<>":function(A){A=A*2;
if(A<1){return Az(A,3)/2
}A-=2;
return(Az(A,3)+2)/2
},backIn:function(A){var B=1.70158;
return A*A*((B+1)*A-B)
},backOut:function(A){A=A-1;
var B=1.70158;
return A*A*((B+1)*A+B)+1
},elastic:function(B){if(B==0||B==1){return B
}var A=0.3,C=A/4;
return Az(2,-10*B)*Math.sin((B-C)*(2*Math.PI)/A)+1
},bounce:function(B){var A=7.5625,C=2.75,D;
if(B<(1/C)){D=A*B*B
}else{if(B<(2/C)){B-=(1.5/C);
D=A*B*B+0.75
}else{if(B<(2.5/C)){B-=(2.25/C);
D=A*B*B+0.9375
}else{B-=(2.625/C);
D=A*B*B+0.984375
}}}return D
}};
var S={length:0},Au=function(){var W=+new Date;
for(var I in S){if(I!="length"&&S[Ao](I)){var A=S[I];
if(A.stop){delete S[I];
S[AL]--;
continue
}var Y=W-A.start,K=A.ms,L=A.easing,H=A.from,O=A.diff,D=A.to,P=A.t,M=A.prev||0,X=A.el,B=A.callback,N={},U;
if(Y<K){var Z=AU.easing_formulas[L]?AU.easing_formulas[L](Y/K):Y/K;
for(var J in H){if(H[Ao](J)){switch(Af[J]){case"number":U=+H[J]+Z*K*O[J];
break;
case"colour":U="rgb("+[AC(At(H[J].r+Z*K*O[J].r)),AC(At(H[J].g+Z*K*O[J].g)),AC(At(H[J].b+Z*K*O[J].b))][BA](",")+")";
break;
case"path":U=[];
for(var F=0,Q=H[J][AL];
F<Q;
F++){U[F]=[H[J][F][0]];
for(var G=1,C=H[J][F][AL];
G<C;
G++){U[F][G]=+H[J][F][G]+Z*K*O[J][F][G]
}U[F]=U[F][BA](AV)
}U=U[BA](AV);
break;
case"csv":switch(J){case"translation":var T=O[J][0]*(Y-M),V=O[J][1]*(Y-M);
P.x+=T;
P.y+=V;
U=T+AV+V;
break;
case"rotation":U=+H[J][0]+Z*K*O[J][0];
H[J][1]&&(U+=","+H[J][1]+","+H[J][2]);
break;
case"scale":U=[+H[J][0]+Z*K*O[J][0],+H[J][1]+Z*K*O[J][1],(2 in D[J]?D[J][2]:BE),(3 in D[J]?D[J][3]:BE)][BA](AV);
break;
case"clip-rect":U=[];
var F=4;
while(F--){U[F]=+H[J][F]+Z*K*O[J][F]
}break
}break
}N[J]=U
}}X.attr(N);
X._run&&X._run.call(X)
}else{(P.x||P.y)&&X.translate(-P.x,-P.y);
D.scale&&(D.scale=D.scale+BE);
X.attr(D);
AU.is(B,"function")&&B.call(X);
delete S[I];
S[AL]--;
X.in_animation=null
}A.prev=Y
}}AU.svg&&Ax.safari();
S[AL]&&setTimeout(Au)
},AC=function(A){return A>255?255:(A<0?0:A)
};
BB[Aj].animateWith=function(B,D,F,A,C){S[B.id]&&(D.start=S[B.id].start);
return this.animate(D,F,A,C)
};
BB[Aj].onAnimation=function(A){this._run=A||null;
return this
};
BB[Aj].animate=function(M,N,F,O){if(AU.is(F,"function")||!F){O=F||null
}var D={},C={},B={};
for(var G in M){if(M[Ao](G)){if(Af[Ao](G)){D[G]=this.attr(G);
(D[G]==null)&&(D[G]=AN[G]);
C[G]=M[G];
switch(Af[G]){case"number":B[G]=(C[G]-D[G])/N;
break;
case"colour":D[G]=AU.getRGB(D[G]);
var I=AU.getRGB(C[G]);
B[G]={r:(I.r-D[G].r)/N,g:(I.g-D[G].g)/N,b:(I.b-D[G].b)/N};
break;
case"path":var Q=e(D[G],C[G]);
D[G]=Q[0];
C[G]=Q[1];
B[G]=[];
for(var K=0,P=D[G][AL];
K<P;
K++){B[G][K]=[0];
for(var J=1,H=D[G][K][AL];
J<H;
J++){B[G][K][J]=(C[G][K][J]-D[G][K][J])/N
}}break;
case"csv":var A=(M[G]+BE)[AD](AS),L=(D[G]+BE)[AD](AS);
switch(G){case"translation":D[G]=[0,0];
B[G]=[A[0]/N,A[1]/N];
break;
case"rotation":D[G]=(L[1]==A[1]&&L[2]==A[2])?L:[0,A[1],A[2]];
B[G]=[(A[0]-D[G][0])/N,0,0];
break;
case"scale":M[G]=A;
D[G]=(D[G]+BE)[AD](AS);
B[G]=[(A[0]-D[G][0])/N,(A[1]-D[G][1])/N,0,0];
break;
case"clip-rect":D[G]=(D[G]+BE)[AD](AS);
B[G]=[];
var K=4;
while(K--){B[G][K]=(A[K]-D[G][K])/N
}break
}C[G]=A
}}}}this.stop();
this.in_animation=1;
S[this.id]={start:M.start||+new Date,ms:N,easing:F,from:D,diff:B,to:C,el:this,callback:O,t:{x:0,y:0}};
++S[AL]==1&&Au();
return this
};
BB[Aj].stop=function(){delete S[this.id];
delete this.in_animation;
return this
};
BB[Aj].translate=function(C,B){if(C==null){return{x:this._.tx,y:this._.ty}
}this._.tx+=+C;
this._.ty+=+B;
switch(this.type){case"circle":case"ellipse":this.attr({cx:+C+this.attrs.cx,cy:+B+this.attrs.cy});
break;
case"rect":case"image":case"text":this.attr({x:+C+this.attrs.x,y:+B+this.attrs.y});
break;
case"path":var A=Ac(this.attrs.path);
A[0][1]+=+C;
A[0][2]+=+B;
this.attr({path:A});
break
}return this
};
BB[Aj][A9]=function(){return"Rapha\u00ebl\u2019s object"
};
AU.ae=S;
var Am=function(C){this.items=[];
this[AL]=0;
if(C){for(var B=0,A=C[AL];
B<A;
B++){if(C[B]&&(C[B].constructor==BB||C[B].constructor==Am)){this[this.items[AL]]=this.items[this.items[AL]]=C[B];
this[AL]++
}}}};
Am[Aj][AQ]=function(){var A,D;
for(var C=0,B=arguments[AL];
C<B;
C++){A=arguments[C];
if(A&&(A.constructor==BB||A.constructor==Am)){D=this.items[AL];
this[D]=this.items[D]=A;
this[AL]++
}}return this
};
Am[Aj].pop=function(){delete this[this[AL]--];
return this.items.pop()
};
for(var AE in BB[Aj]){if(BB[Aj][Ao](AE)){Am[Aj][AE]=(function(A){return function(){for(var C=0,B=this.items[AL];
C<B;
C++){this.items[C][A][An](this.items[C],arguments)
}return this
}
})(AE)
}}Am[Aj].attr=function(F,C){if(F&&AU.is(F,"array")&&AU.is(F[0],"object")){for(var G=0,D=F[AL];
G<D;
G++){this.items[G].attr(F[G])
}}else{for(var B=0,A=this.items[AL];
B<A;
B++){this.items[B].attr[An](this.items[B],arguments)
}}return this
};
Am[Aj].animate=function(H,G,B,D){(AU.is(B,"function")||!B)&&(D=B||null);
var I=this.items[AL],C=I,F=this,A;
D&&(A=function(){!--I&&D.call(F)
});
this.items[--C].animate(H,G,B||A,A);
while(C--){this.items[C].animateWith(this.items[I-1],H,G,B||A,A)
}return this
};
Am[Aj].insertAfter=function(A){var B=this.items[AL];
while(B--){this.items[B].insertAfter(A)
}};
Am[Aj].getBBox=function(){var G=[],C=[],F=[],A=[];
for(var B=this.items[AL];
B--;
){var D=this.items[B].getBBox();
G[AQ](D.x);
C[AQ](D.y);
F[AQ](D.x+D.width);
A[AQ](D.y+D.height)
}G=A3[An](0,G);
C=A3[An](0,C);
return{x:G,y:C,width:AP[An](0,F)-G,height:AP[An](0,A)-C}
};
AU.registerFont=function(B){if(!B.face){return B
}this.fonts=this.fonts||{};
var C={w:B.w,face:{},glyphs:{}},G=B.face["font-family"];
for(var D in B.face){if(B.face[Ao](D)){C.face[D]=B.face[D]
}}if(this.fonts[G]){this.fonts[G][AQ](C)
}else{this.fonts[G]=[C]
}if(!B.svg){C.face["units-per-em"]=i(B.face["units-per-em"],10);
for(var A in B.glyphs){if(B.glyphs[Ao](A)){var F=B.glyphs[A];
C.glyphs[A]={w:F.w,k:{},d:F.d&&"M"+F.d[Ay](/[mlcxtrv]/g,function(I){return{l:"L",c:"C",x:"z",t:"m",r:"l",v:"c"}[I]||"M"
})+"z"};
if(F.k){for(var H in F.k){if(F[Ao](H)){C.glyphs[A].k[H]=F.k[H]
}}}}}}return B
};
Ax.getFont=function(C,B,K,G){G=G||"normal";
K=K||"normal";
B=+B||{normal:400,bold:700,lighter:300,bolder:800}[B]||400;
var H=AU.fonts[C];
if(!H){var I=new RegExp("(^|\\s)"+C[Ay](/[^\w\d\s+!~.:_-]/g,BE)+"(\\s|$)","i");
for(var J in AU.fonts){if(AU.fonts[Ao](J)){if(I.test(J)){H=AU.fonts[J];
break
}}}}var F;
if(H){for(var D=0,A=H[AL];
D<A;
D++){F=H[D];
if(F.face["font-weight"]==B&&(F.face["font-style"]==K||!F.face["font-style"])&&F.face["font-stretch"]==G){break
}}}return F
};
Ax.print=function(F,G,I,O,A){var M=this.set(),H=(I+BE)[AD](BE),N=0,B=BE,K;
AU.is(O,"string")&&(O=this.getFont(O));
if(O){K=(A||16)/O.face["units-per-em"];
for(var J=0,D=H[AL];
J<D;
J++){var L=J&&O.glyphs[H[J-1]]||{},C=O.glyphs[H[J]];
N+=J?(L.w||O.w)+(L.k&&L.k[H[J]]||0):0;
C&&C.d&&M[AQ](this.path(C.d).attr({fill:"#000",stroke:"none",translation:[N,0]}))
}M.scale(K,K,0,G).translate(F,(A||16)/2)
}return M
};
AU.format=function(B){var A=AU.is(arguments[1],"array")?[0][As](arguments[1]):arguments,C=/\{(\d+)\}/g;
B&&AU.is(B,"string")&&A[AL]-1&&(B=B[Ay](C,function(D,F){return A[++F]==null?BE:A[F]
}));
return B||BE
};
AU.ninja=function(){var C=BD.Raphael,A;
if(AM.was){BD.Raphael=AM.is
}else{try{delete BD.Raphael
}catch(B){BD.Raphael=A
}}return C
};
AU.el=BB[Aj];
return AU
})();