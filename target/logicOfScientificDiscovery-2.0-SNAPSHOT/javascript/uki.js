(function(){function K(F,E){var B=(F+"").match(/([-0-9\.]+)(\S*)/);
F=parseFloat(B[1],10);
if(B=(B[2]||"").toLowerCase()){if(B=="%"&&E){F*=E/100
}}if(F<0&&E){F=E+F
}return F
}var V=this,D=document,A=navigator.userAgent,T="uki"+ +new Date,X=Math.max,M=Math.min,S=Math.floor,Q=Math.ceil;
V.uki=function(G,E){if(typeof G=="string"){var B=G.match(/^#((?:[\w\u00c0-\uFFFF_-]|\\.)+)$/),F=B&&uki._ids[B[1]];
if(B&&!E){return new uki.Collection(F?[F]:[])
}return uki.find(G,E)
}if(G.length===undefined){G=[G]
}if(G.length>0&&uki.isFunction(G[0].typeName)){return new uki.Collection(G)
}return uki.build(G)
};
uki.version="0.0.8a";
uki.F=function(){return false
};
uki._ids={};
uki.registerId=function(B){uki._ids[uki.attr(B,"id")]=B
};
uki.unregisterId=function(B){uki._ids[uki.attr(B,"id")]=undefined
};
var O=Object.prototype.toString,L=uki.utils={attr:function(F,E,B){if(B!==undefined){if(L.isFunction(F[E])){F[E](B)
}else{F[E]=B
}return F
}else{return L.isFunction(F[E])?F[E]():F[E]
}},proxy:function(E,B){return function(){return E.apply(B,arguments)
}
},isFunction:function(B){return O.call(B)==="[object Function]"
},isArray:function(B){return O.call(B)==="[object Array]"
},trim:function(B){return(B||"").replace(/^\s+|\s+$/g,"")
},escapeHTML:function(E){var B={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;"};
return E.replace(/[&<>\"\']/g,function(F){return B[F]
})
},each:function(I,E,B){var H,F=0,G=I.length;
if(G===undefined){for(H in I){if(!(!H||I[H]===undefined||!I.hasOwnProperty(H))){if(E.call(B||I[H],H,I[H])===false){break
}}}}else{for(H=I[0];
F<G&&E.call(B||H,F,H)!==false;
H=I[++F]){}}return I
},inArray:function(G,E){for(var B=0,F=E.length;
B<F;
B++){if(E[B]===G){return B
}}return -1
},unique:function(J){var E=[],B={};
try{for(var I=0,G=J.length;
I<G;
I++){var H=J[I];
if(!B[H]){B[H]=true;
E.push(J[I])
}}}catch(F){E=J
}return E
},grep:function(H,E){for(var B=[],G=0,F=H.length;
G<F;
G++){E(H[G],G)&&B.push(H[G])
}return B
},map:function(Y,E,B){for(var J=[],H=L.isFunction(E)?E:function(Z){return L.attr(Z,E)
},I=0,G=Y.length;
I<G;
I++){var F=H.call(B||Y[I],Y[I],I);
if(F!=null){J[J.length]=F
}}return J
},reduce:function(I,E,B,H){for(var F=0,G=E.length;
F<G;
F++){I=B.call(H||E[F],I,E[F],F)
}return I
},extend:function(){for(var I=arguments[0]||{},E=1,B=arguments.length,H;
E<B;
E++){if((H=arguments[E])!=null){for(var F in H){var G=H[F];
if(G!==undefined){I[F]=G
}}}}return I
},newClass:function(){var E=function(){this.init.apply(this,arguments)
},B;
B=0;
if(arguments.length>1){if(arguments[0].prototype){B=function(){};
B.prototype=arguments[0].prototype;
E.prototype=new B;
B=1
}}for(B=B;
B<arguments.length;
B++){L.extend(E.prototype,arguments[B])
}return E
},newProp:function(E,B){return function(F){if(F===undefined){return this[E]
}if(B){B.call(this,F)
}else{this[E]=F
}return this
}
},addProps:function(E,B){L.each(B,function(){E[this]=L.newProp("_"+this)
})
},delegateProp:function(G,E,B){var F="_"+E;
G[E]=function(H){if(this[B]){return L.attr(this[B],E,H)
}if(H===undefined){return this[F]
}this[F]=H;
return this
}
}};
L.extend(uki,L);
uki.geometry={};
var N=uki.geometry.Point=function(E,B){this.x=E||0;
this.y=B||0
};
N.prototype={toString:function(){return this.x+" "+this.y
},clone:function(){return new N(this.x,this.y)
},eq:function(B){return this.x==B.x&&this.y==B.y
},offset:function(E,B){this.x+=E;
this.y+=B;
return this
},constructor:N};
N.fromString=function(E,B){E=E.split(/\s+/);
return new N(K(E[0],B&&B.width),K(E[1],B&&B.height))
};
var R=uki.geometry.Size=function(E,B){this.width=E||0;
this.height=B||0
};
R.prototype={toString:function(){return this.width+" "+this.height
},clone:function(){return new R(this.width,this.height)
},eq:function(B){return this.width==B.width&&this.height==B.height
},empty:function(){return this.width<=0||this.height<=0
},constructor:R};
R.fromString=function(E,B){E=E.split(/\s+/);
return new R(K(E[0],B&&B.width),K(E[1],B&&B.height))
};
R.create=function(E,B){if(E===undefined){return null
}if(E.width!==undefined){return E
}if(/\S+\s+\S+/.test(E+"")){return R.fromString(E,B)
}return new R(E,B)
};
var C=uki.geometry.Rect=function(G,E,B,F){if(B!==undefined){this.x=G;
this.y=E;
this.width=B;
this.height=F
}else{if(G===undefined||G.x===undefined){this.y=this.x=0;
this.width=G||0;
this.height=E||0
}else{this.x=G?G.x:0;
this.y=G?G.y:0;
this.width=E?E.width:0;
this.height=E?E.height:0
}}};
C.prototype={toString:function(){return[this.x,this.y,this.width,this.height].join(" ")
},toCoordsString:function(){return[this.x,this.y,this.maxX(),this.maxY()].join(" ")
},clone:function(){return new C(this.x,this.y,this.width,this.height)
},minX:function(){return this.x
},maxX:function(){return this.x+this.width
},midX:function(){return this.x+this.width/2
},minY:function(){return this.y
},midY:function(){return this.y+this.height/2
},maxY:function(){return this.y+this.height
},normalize:function(){this.x=this.y=0;
return this
},empty:R.prototype.empty,eq:function(B){return B&&this.x==B.x&&this.y==B.y&&this.height==B.height&&this.width==B.width
},inset:function(E,B){this.x+=E;
this.y+=B;
this.width-=E*2;
this.height-=B*2;
return this
},offset:N.prototype.offset,intersection:function(E){var B=new N(X(this.x,E.x),X(this.y,E.y));
E=new R(M(this.maxX(),E.maxX())-B.x,M(this.maxY(),E.maxY())-B.y);
return E.empty()?new C:new C(B,E)
},union:function(B){return C.fromCoords(M(this.x,B.x),M(this.y,B.y),X(this.maxX(),B.maxX()),X(this.maxY(),B.maxY()))
},containsPoint:function(B){return B.x>=this.minX()&&B.x<=this.maxX()&&B.y>=this.minY()&&B.y<=this.maxY()
},containsRect:function(B){return this.eq(this.union(B))
},constructor:C};
C.prototype.left=C.prototype.minX;
C.prototype.top=C.prototype.minY;
C.fromCoords=function(G,E,B,F){if(B===undefined){return new C(G.x,G.y,E.x-G.x,E.y-G.y)
}return new C(G,E,B-G,F-E)
};
C.fromCoordsString=function(E,B){E=E.split(/\s+/);
return C.fromCoords(K(E[0],B&&B.width),K(E[1],B&&B.height),K(E[2],B&&B.width),K(E[3],B&&B.height))
};
C.fromString=function(E,B){E=E.split(/\s+/);
if(E.length>2){return new C(K(E[0],B&&B.width),K(E[1],B&&B.height),K(E[2],B&&B.width),K(E[3],B&&B.height))
}return new C(K(E[0],B&&B.width),K(E[1],B&&B.height))
};
C.create=function(G,E,B,F){if(G===undefined){return null
}if(G.x!==undefined){return G
}if(/\S+\s+\S+/.test(G+"")){return C.fromString(G,E)
}if(B===undefined){return new C(G,E)
}return new C(G,E,B,F)
};
var P=uki.geometry.Inset=function(G,E,B,F){this.top=G||0;
this.right=E||0;
this.bottom=B===undefined?this.top:B;
this.left=F===undefined?this.right:F
};
P.prototype={toString:function(){return[this.top,this.right,this.bottom,this.left].join(" ")
},clone:function(){return new P(this.top,this.right,this.bottom,this.left)
},width:function(){return this.left+this.right
},height:function(){return this.top+this.bottom
},negative:function(){return this.top<0||this.left<0||this.right<0||this.bottom<0
},empty:function(){return !this.top&&!this.left&&!this.right&&!this.bottom
}};
P.fromString=function(E,B){E=E.split(/\s+/);
if(E.length<3){E[2]=E[0]
}if(E.length<4){E[3]=E[1]
}return new P(K(E[0],B),K(E[1],B),K(E[2],B),K(E[3],B))
};
P.create=function(G,E,B,F){if(G===undefined){return null
}if(G.top!==undefined){return G
}if(/\S+\s+\S+/.test(G+"")){return P.fromString(G,E)
}if(B===undefined){return new P(G,E)
}return new P(G,E,B,F)
};
uki.dom={guid:1,createElement:function(F,E,B){F=D.createElement(F);
if(E){F.style.cssText=E
}if(B){F.innerHTML=B
}F[T]=uki.dom.guid++;
return F
},probe:function(F,E){var B=D.body;
B.appendChild(F);
E(F);
B.removeChild(F)
},layout:function(F,E,B){B=B||{};
if(B.left!=E.left){F.left=E.left+"px"
}if(B.top!=E.top){F.top=E.top+"px"
}if(B.right!=E.right){F.right=E.right+"px"
}if(B.bottom!=E.bottom){F.bottom=E.bottom+"px"
}if(B.width!=E.width){F.width=X(E.width,0)+"px"
}if(B.height!=E.height){F.height=X(E.height,0)+"px"
}return E
},computedStyle:function(B){if(D&&D.defaultView&&D.defaultView.getComputedStyle){return D.defaultView.getComputedStyle(B,null)
}else{if(B.currentStyle){return B.currentStyle
}}},contains:function(G,E){try{if(G.contains){return G.contains(E)
}if(G.compareDocumentPosition){return G.compareDocumentPosition(E)&16
}}catch(B){}for(;
E&&E!=G;
){try{E=E.parentNode
}catch(F){E=null
}}return G==E
},createStylesheet:function(E){var B=D.createElement("style");
D.getElementsByTagName("head")[0].appendChild(B);
if(B.styleSheet){B.styleSheet.cssText=E
}else{B.appendChild(document.createTextNode(E))
}return B
}};
uki.each(["createElement"],function(E,B){uki[B]=uki.dom[B]
});
uki.view={};
uki.view.Observable={bind:function(E,B){uki.each(E.split(" "),function(F,G){this._bound(G)||this._bindToDom(G);
this._observersFor(G).push(B)
},this)
},unbind:function(E,B){uki.each(E.split(" "),function(F,G){this._observers[G]=uki.grep(this._observers[G],function(H){return H!=B
});
this._observers[G].length==0&&this._unbindFromDom(G)
},this)
},trigger:function(E){var B=Array.prototype.slice.call(arguments,1);
uki.each(this._observersFor(E,true),function(F,G){G.apply(this,B)
},this)
},_unbindFromDom:function(B){this._domHander&&this._eventTargets[B]&&uki.dom.unbind(this._eventTargets[B],B,this._domHander)
},_bindToDom:function(E,B){this._domHander=this._domHander||uki.proxy(function(F){this.trigger(F.type,{domEvent:F,source:this})
},this);
this._eventTargets=this._eventTargets||{};
this._eventTargets[E]=B||this.dom();
uki.dom.bind(this._eventTargets[E],E,this._domHander);
return true
},_bound:function(B){return this._observers&&this._observers[B]
},_observersFor:function(E,B){if(B&&(!this._observers||!this._observers[E])){return[]
}if(!this._observers){this._observers={}
}this._observers[E]||(this._observers[E]=[]);
return this._observers[E]
}};
(function(){function E(){return D.compatMode=="CSS1Compat"&&D.documentElement||D.body
}var B=uki.Attachment=uki.newClass(uki.view.Observable,{init:function(F,H,G){uki.initNativeLayout();
this._dom=F=F||V;
this._view=H;
this._rect=C.create(G)||this.rect();
uki.dom.offset.initialize();
H.parent(this);
this.domForChild().appendChild(H.dom());
if(F!=V&&F.tagName!="BODY"){H=F.runtimeStyle||F.ownerDocument.defaultView.getComputedStyle(F,null);
if(!H.position||H.position=="static"){F.style.position="relative"
}}B.register(this);
this.layout()
},domForChild:function(){return this._dom===V?D.body:this._dom
},rectForChild:function(){return this.rect()
},scroll:function(){},scrollTop:function(){return this._dom.scrollTop||0
},scrollLeft:function(){return this._dom.scrollLeft||0
},parent:function(){return null
},layout:function(){var F=this._rect,G=this._rect=this.rect();
this._view.parentResized(F,G);
this._view._needsLayout&&this._view.layout();
this.trigger("layout",{source:this,rect:G})
},dom:function(){return this._dom
},view:function(){return this._view
},rect:function(){var F=this._dom===V||this._dom===D.body?X(E().clientWidth,this._dom.offsetWidth||0):this._dom.offsetWidth,G=this._dom===V||this._dom===D.body?X(E().clientHeight,this._dom.offsetHeight||0):this._dom.offsetHeight;
return new C(F,G)
}});
B.instances=[];
B.register=function(F){if(B.instances.length==0){var G=false;
uki.dom.bind(V,"resize",function(){if(!G){G=true;
setTimeout(function(){G=false;
uki.each(B.instances,function(){this.layout()
})
},1)
}})
}B.instances.push(F)
};
B.childViews=function(){return uki.map(B.instances,"view")
};
uki.top=function(){return[B]
}
})();
uki.Collection=function(B){this.length=0;
Array.prototype.push.apply(this,B)
};
uki.fn=uki.Collection.prototype=new (function(){var B=this;
this.each=function(E){uki.each(this,E);
return this
};
this.grep=function(E){return new uki.Collection(uki.grep(this,E))
};
this.attr=function(F,E){if(E!==undefined){this.each(function(){uki.attr(this,F,E)
});
return this
}else{return this[0]?uki.attr(this[0],F):""
}};
this.find=function(E){return uki.find(E,this)
};
this.attachTo=function(F,E){this.each(function(){new uki.Attachment(F,this,E)
});
return this
};
this.append=function(F){if(!this[0]){return this
}F=F.length!==undefined?F:[F];
for(var E=0;
E<F.length;
E++){this[0].appendChild(F[E])
}return this
};
uki.Collection.addAttrs=function(E){uki.each(E.split(","),function(F,G){B[G]=function(H){return this.attr(G,H)
}
})
};
uki.Collection.addAttrs("html,text,background,value,rect,checked,anchors,childViews,typeName,id,name,visible,disabled,focusable,style");
uki.each(["parent"],function(F,E){B[E]=function(){return new uki.Collection(uki.map(this,E))
}
});
uki.each(["scrollableParent"],function(F,E){B[E]=function(){return new uki.Collection(uki.map(this,function(G){return uki.view[E](G)
}))
}
});
uki.each("bind,unload,trigger,layout,appendChild,removeChild,insertBefore,addRow,removeRow,resizeToContents,toggle".split(","),function(F,E){B[E]=function(){for(var G=0;
G<this.length;
G++){this[G][E].apply(this[G],arguments)
}return this
}
});
uki.each("blur,focus,load,resize,scroll,unload,click,dblclick,mousedown,mouseup,mousemove,mouseover,mouseout,mouseenter,mouseleave,change,select,submit,keydown,keypress,keyup,error".split(","),function(F,E){B[E]=function(G){if(G){this.bind(E,G)
}else{for(G=0;
G<this.length;
G++){this[G][E]()
}}return this
}
})
});
(function(){function F(G){return uki.map(G,function(H){return E(H)
})
}function E(J){if(uki.isFunction(J.typeName)){return J
}var H=J.view||J.type;
if(uki.isFunction(H)){H=H()
}else{if(typeof H==="string"){H=H.split(".");
var I=V;
if(!V[H[0]]||H[0]=="Image"){H=["uki","view"].concat(H)
}for(var G=0;
G<H.length;
G++){I=I[H[G]]
}H=new I(J.rect)
}else{H=H
}}B(H,J);
return H
}function B(H,G){uki.each(G,function(J,I){J=="view"||J=="type"||J=="rect"||uki.attr(H,J,I)
});
return H
}uki.build=function(G){if(G.length===undefined){G=[G]
}return new uki.Collection(F(G))
};
uki.build.copyAttrs=B
})();
(function(){function k(a){return m(uki.map(a,function(b){return[b].concat(k(I(b,"childViews")))
}))
}function m(a){return uki.reduce([],a,l)
}function l(b,a){return b.concat(a)
}function Z(b){var a=[],c;
for(c=0;
c<b.length;
c++){b[c][Y]||(a[a.length]=b[c]);
b[c][Y]=true
}for(c=0;
c<a.length;
c++){a[c][Y]=undefined
}return a
}var J,Y="__selector_marked",I=uki.attr,H=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?/g,G=[{name:"ID",regexp:/#((?:[\w\u00c0-\uFFFF_-]|\\.)+)/},{name:"ATTR",regexp:/\[\s*((?:[\w\u00c0-\uFFFF_-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/},{name:"TYPE",regexp:/^((?:[\w\u00c0-\uFFFF\*_\.-]|\\.)+)/},{name:"POS",regexp:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/}],E={first:function(a){return a===0
},last:function(b,a,c){return b===c.length-1
},even:function(a){return a%2===0
},odd:function(a){return a%2===1
},lt:function(b,a){return b<a[2]-0
},gt:function(b,a){return b>a[2]-0
},nth:function(b,a){return a[2]-0==b
},eq:function(b,a){return a[2]-0==b
}},F={TYPE:function(b,a){a=a[1];
if(a=="*"){return true
}return(b=I(b,"typeName"))&&b.length>=a.length&&("."+b).indexOf("."+a)==b.length-a.length
},ATTR:function(b,a){b=I(b,a[1]);
var d=b+"",c=a[2];
a=a[4];
return b==null?c==="!=":c==="="?d===a:c==="*="?d.indexOf(a)>=0:c==="~="?(" "+d+" ").indexOf(a)>=0:!a?d&&b!==false:c==="!="?d!=a:c==="^="?d.indexOf(a)===0:c==="$="?d.substr(d.length-a.length)===a:false
},ID:function(b,a){return F.ATTR(b,["","id","=","",a[1]])
},POS:function(b,a,d,c){return(b=E[a[1]])?b(d,a,c):false
}},B={"+":function(){},">":function(a){return m(uki.map(a,"childViews"))
},"":function(a){return k(m(uki.map(a,"childViews")))
},"~":function(){}};
J=uki.Selector={find:function(c,b,e){b=b||uki.top();
if(b.length===undefined){b=[b]
}var d=J.tokenize(c);
c=d[0];
d=d[1];
for(var a=b,f;
c.length>0;
){f=B[c[0]]?B[c.shift()]:B[""];
a=f(a);
if(c.length==0){break
}a=J.reduce(c.shift(),a)
}if(d){a=a.concat(J.find(d,b,true))
}return e?a:new uki.Collection(Z(a))
},reduce:function(b,a){if(!a||!a.length){return[]
}for(var d,c;
b!="";
){c=false;
uki.each(G,function(e,f){if(d=b.match(f.regexp)){c=true;
a=uki.grep(a,function(h,g){return F[f.name](h,d,g,a)
});
b=b.replace(f.regexp,"");
return false
}});
if(!c){break
}}return a
},tokenize:function(b){var a=[],d,c;
for(H.lastIndex=0;
(d=H.exec(b))!==null;
){a.push(d[1]);
if(d[2]){c=RegExp.rightContext;
break
}}return[a,c]
}};
uki.find=J.find
})();
uki.extend(uki.dom,{bound:{},handles:{},events:"blur,focus,load,resize,scroll,unload,click,dblclick,mousedown,mouseup,mousemove,mouseover,mouseout,mouseenter,mouseleave,change,select,submit,keydown,keypress,keyup,error".split(","),bind:function(J,E,B){if(J.setInterval&&J!=window){J=window
}B.huid=B.huid||uki.dom.guid++;
var I=J[T]=J[T]||uki.dom.guid++,G=uki.dom.handles[I]=uki.dom.handles[I]||function(){uki.dom.handler.apply(arguments.callee.elem,arguments)
},H,F;
G.elem=J;
uki.dom.bound[I]||(uki.dom.bound[I]={});
E=E.split(" ");
for(H=0;
H<E.length;
H++){F=E[H];
if(!uki.dom.bound[I][F]){J.addEventListener?J.addEventListener(F,G,false):J.attachEvent("on"+F,G);
uki.dom.bound[I][F]=[]
}uki.dom.bound[I][F].push(B)
}B=G=J=null
},unbind:function(H,E,B){H=H[T];
var G=B.huid,F;
E=E.split(" ");
for(B=0;
B<E.length;
B++){F=E[B];
!G||!H||!uki.dom.bound[H]||!uki.dom.bound[H][F]||(uki.dom.bound[H][F]=uki.grep(uki.dom.bound[H][F],function(I){return I.huid!==G
}))
}},handler:function(G){G=uki.dom.fix(G||V.event);
var E=G.type,B=this[T],F=uki.dom.bound[B];
if(!(!B||!F||!F[E])){B=0;
for(F=F[E];
B<F.length;
B++){F[B].call(this,G)
}}},preventDefault:function(B){if(B){B.preventDefault?B.preventDefault():(B.returnValue=false)
}},fix:function(G){if(!G.target){G.target=G.srcElement||D
}if(G.target.nodeType==3){G.target=G.target.parentNode
}if(!G.relatedTarget&&G.fromElement){G.relatedTarget=G.fromElement==G.target?G.toElement:G.fromElement
}if(G.pageX==null&&G.clientX!=null){var E=D.documentElement,B=D.body;
G.pageX=G.clientX+(E&&E.scrollLeft||B&&B.scrollLeft||0)-(E.clientLeft||0);
G.pageY=G.clientY+(E&&E.scrollTop||B&&B.scrollTop||0)-(E.clientTop||0)
}if(!G.which&&(G.charCode||G.charCode===0?G.charCode:G.keyCode)){G.which=G.charCode||G.keyCode
}if(!G.metaKey&&G.ctrlKey){try{G.metaKey=G.ctrlKey
}catch(F){}}if(!G.which&&G.button){G.which=G.button&1?1:G.button&2?3:G.button&4?2:0
}return G
}});
V.attachEvent&&V.attachEvent("onunload",function(){uki.each(uki.dom.bound,function(E,B){uki.each(B,function(F){try{uki.dom.handles[E].elem.detachEvent("on"+F,uki.dom.handles[E])
}catch(G){}})
})
});
(function(){var B;
B=D.documentElement.getBoundingClientRect?(uki.dom.offset=function(F){if(!F||F==V){return new N
}if(F===F.ownerDocument.body){return B.bodyOffset(F)
}B.boxModel===undefined&&B.initializeBoxModel();
var E=F.getBoundingClientRect(),G=F.ownerDocument;
F=G.body;
G=G.documentElement;
return new N(E.left+(B.pageXOffset||B.boxModel&&G.scrollLeft||F.scrollLeft)-(G.clientLeft||F.clientLeft||0),E.top+(B.pageYOffset||B.boxModel&&G.scrollTop||F.scrollTop)-(G.clientTop||F.clientTop||0))
}):(uki.dom.offset=function(F){if(!F||F==V){return new N
}if(F===F.ownerDocument.body){return B.bodyOffset(F)
}B.initialized||B.initialize();
var E=F.offsetParent,Z=F.ownerDocument,J,Y=Z.documentElement,I=Z.body;
Z=Z.defaultView;
J=Z.getComputedStyle(F,null);
for(var H=F.offsetTop,G=F.offsetLeft;
(F=F.parentNode)&&F!==I&&F!==Y;
){J=Z.getComputedStyle(F,null);
H-=F.scrollTop;
G-=F.scrollLeft;
if(F===E){H+=F.offsetTop;
G+=F.offsetLeft;
if(B.doesNotAddBorder&&!(B.doesAddBorderForTableAndCells&&/^t(able|d|h)$/i.test(F.tagName))){H+=parseInt(J.borderTopWidth,10)||0;
G+=parseInt(J.borderLeftWidth,10)||0
}E=F.offsetParent
}if(B.subtractsBorderForOverflowNotVisible&&J.overflow!=="visible"){H+=parseInt(J.borderTopWidth,10)||0;
G+=parseInt(J.borderLeftWidth,10)||0
}J=J
}if(J.position==="relative"||J.position==="static"){H+=I.offsetTop;
G+=I.offsetLeft
}if(J.position==="fixed"){H+=X(Y.scrollTop,I.scrollTop);
G+=X(Y.scrollLeft,I.scrollLeft)
}return new N(G,H)
});
uki.extend(B,{initialize:function(){if(!this.initialized){var F=D.body,E=D.createElement("div"),J,H,I,G=F.style.marginTop;
J={position:"absolute",top:0,left:0,margin:0,border:0,width:"1px",height:"1px",visibility:"hidden"};
for(H in J){E.style[H]=J[H]
}E.innerHTML='<div style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;"><div></div></div><table style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;" cellpadding="0" cellspacing="0"><tr><td></td></tr></table>';
F.insertBefore(E,F.firstChild);
J=E.firstChild;
H=J.firstChild;
I=J.nextSibling.firstChild.firstChild;
this.doesNotAddBorder=H.offsetTop!==5;
this.doesAddBorderForTableAndCells=I.offsetTop===5;
J.style.overflow="hidden";
J.style.position="relative";
this.subtractsBorderForOverflowNotVisible=H.offsetTop===-5;
F.style.marginTop="1px";
this.doesNotIncludeMarginInBodyOffset=F.offsetTop===0;
F.style.marginTop=G;
F.removeChild(E);
this.boxModel===undefined&&this.initializeBoxModel();
this.initialized=true
}},initializeBoxModel:function(){if(this.boxModel===undefined){var E=D.createElement("div");
E.style.width=E.style.paddingLeft="1px";
D.body.appendChild(E);
this.boxModel=E.offsetWidth===2;
D.body.removeChild(E).style.display="none"
}},bodyOffset:function(F){B.initialized||B.initialize();
var E=F.offsetTop,G=F.offsetLeft;
if(uki.dom.doesNotIncludeMarginInBodyOffset){E+=parseInt(uki.dom.elem.currentStyle(F).marginTop,10)||0;
G+=parseInt(uki.dom.elem.currentStyle(F).marginLeft,10)||0
}return new N(G,E)
}})
})();
(function(){function Y(){uki.dom.bind(F,"mousemove scroll",B);
uki.dom.bind(F,"mouseup",J);
uki.dom.bind(F.body,"selectstart mousedown",H)
}function E(){uki.dom.unbind(F,"mousemove scroll",B);
uki.dom.unbind(F,"mouseup",J);
uki.dom.unbind(F.body,"selectstart mousedown",H)
}function B(Z){G.draggable&&G.draggable._drag&&G.draggable._drag(Z,I(Z))
}function J(Z){E();
G.draggable&&G.draggable._drop&&G.draggable._drop(Z,I(Z));
G.draggable=null
}function H(Z){Z.preventDefault?Z.preventDefault():(Z.returnValue=false)
}function I(Z){return G.pos.clone().offset(-Z.pageX,-Z.pageY)
}var G=uki.dom.drag={draggable:null,pos:null,start:function(Z,a){this.draggable=Z;
this.pos=new N(a.pageX,a.pageY);
Y()
},watch:function(Z,a){uki.dom.bind(Z,"dragstart",function(b){b.returnValue=false
});
uki.dom.bind(Z,"mousedown",function(b){if(!a._acceptDrag||a._acceptDrag(b)){uki.dom.drag.start(a,b)
}})
}},F=document
})();
uki.initNativeLayout=function(){uki.supportNativeLayout===undefined&&uki.dom.probe(uki.createElement("div","position:absolute;width:100px;height:100px;left:-999em;",'<div style="position:absolute;left:0;right:0"></div>'),function(B){uki.supportNativeLayout=B.childNodes[0].offsetWidth==100&&!V.opera
})
};
uki.image=function(G,E,B){var F=new Image;
F.src=uki.imageSrc(G,E,B);
return F
};
uki.imageSrc=function(F,E,B){if(uki.image.dataUrlSupported&&E){return E
}if(B&&uki.image.needAlphaFix){return B
}return F
};
uki.imageHTML=function(G,E,B,F){if(uki.image.needAlphaFix&&B){G=B
}else{if(uki.image.dataUrlSupported){G=E
}}return"<img"+(F||"")+' src="'+G+'" />'
};
uki.image.load=function(F,E){var B=F.length;
uki.each(F,function(H,G){if(!G||G.width){--B||E()
}else{H=function(){G.onload=G.onerror=G.onabort=null;
--B||E()
};
G.onload=H;
G.onerror=H;
G.onabort=H
}})
};
uki.image.dataUrlSupported=D.createElement("canvas").toDataURL||/MSIE (8)/.test(A);
uki.image.needAlphaFix=/MSIE 6/.test(A);
uki.image.needAlphaFix&&D.execCommand("BackgroundImageCache",false,true);
(function(){var H=/^\s*null\s*$/,E=/theme\s*\(\s*([^)]*\s*)\)/,B=/rows\s*\(\s*([^)]*\s*)\)/,G=/cssBox\s*\(\s*([^)]*\s*)\)/,F=uki.background=function(J){if(typeof J==="string"){var I;
if(J.match(H)){return new F.Null
}if(I=J.match(E)){return uki.theme.background(I[1])
}if(I=J.match(B)){return new F.Rows(I[1].split(",")[0],I[1].split(",").slice(1))
}if(I=J.match(G)){return new F.CssBox(I[1])
}return new F.Css(J)
}return J
}
})();
uki.background.Base=uki.background.Null=uki.newClass({init:uki.F,attachTo:uki.F,detach:uki.F});
uki.background.Sliced9=uki.newClass(new (function(){function H(a,Y,J,I,Z){I=J[3]?B(J,I):"";
J[3]||(Y+=E(J,Z));
return'<div class="'+a+'" style="position:absolute;overflow:hidden;'+Y+'">'+I+"</div>"
}function E(J,I){return";background: url("+uki.imageSrc(J[0],J[1],J[2])+") "+I
}function B(J,I){return uki.imageHTML(J[0],J[1],J[2],' galleryimg="no" style="-webkit-user-drag:none;position:absolute;'+I+'"')
}var G=uki.dom,F={};
this.init=function(Y,J,I){this._settings=uki.extend({},Y);
this._inset=P.create(J);
this._size=null;
this._inited=false;
I=I||{};
this._fixedSize=R.create(I.fixedSize)||new R;
this._bgInset=P.create(I.inset)||new P;
this._zIndex=I.zIndex||-1;
this._container=this._getContainer();
this._container.style.zIndex=this._zIndex
};
this._getContainer=function(){var I=this._getKey();
if(!F[I]){return F[I]=this._createContainer()
}return F[I].cloneNode(true)
};
this._createContainer=function(){var b=this._inset,Y=this._bgInset,J=this._settings,I=b.left+b.right,Z=b.top+b.bottom;
Y=["left:"+Y.left+"px","right:"+Y.right+"px","top:"+Y.top+"px","bottom:"+Y.bottom+"px"].join(";");
var a=[];
if(b.top&&b.left){a[a.length]=H("tl",["left:0;top:0","width:"+b.left+"px","height:"+b.top+"px"].join(";"),J.c,["left:0;top:0","width:"+I+"px","height:"+Z+"px"].join(";"),"top left")
}if(b.top){a[a.length]=H("t",["left:"+b.left+"px","top:0","height:"+b.top+"px","right:"+b.right+"px"].join(";"),J.h,["left:0;top:0;width:100%","height:"+Z+"px"].join(";"),"repeat-x top")
}if(b.top&&b.right){a[a.length]=H("tr",["right:0;top:0","width:"+b.right+"px","height:"+b.top+"px"].join(";"),J.c,["left:-"+b.left+"px","top:0","width:"+I+"px","height:"+Z+"px"].join(";"),"top right")
}if(b.left){a[a.length]=H("l",["left:0","top:"+b.top+"px","width:"+b.left+"px","bottom:"+b.bottom+"px"].join(";"),J.v,["left:0;top:0;height:100%","width:"+I+"px"].join(";"),"repeat-y left")
}if(J.m){a[a.length]=H("m",["left:"+b.left+"px","top:"+b.top+"px","right:"+b.left+"px","bottom:"+b.bottom+"px"].join(";"),J.m,"left:0;top:0;height:100%;width:100%","")
}if(b.right){a[a.length]=H("r",["right:0","top:"+b.top+"px","width:"+b.right+"px","bottom:"+b.bottom+"px"].join(";"),J.v,["left:-"+b.left+"px","top:0;height:100%","width:"+I+"px"].join(";"),"repeat-y right")
}if(b.bottom&&b.left){a[a.length]=H("bl",["left:0;bottom:0","width:"+b.left+"px","height:"+b.bottom+"px"].join(";"),J.c,["left:0","top:-"+b.top+"px","width:"+I+"px","height:"+Z+"px"].join(";"),"left -"+b.top+"px")
}if(b.bottom){a[a.length]=H("b",["left:"+b.left+"px","bottom:0","height:"+b.bottom+"px","right:"+b.right+"px"].join(";"),J.h,["left:0","top:-"+b.top+"px","width:100%","height:"+Z+"px"].join(";"),"repeat-x 0 -"+b.top+"px")
}if(b.bottom&&b.right){a[a.length]=H("br",["right:0;bottom:0","width:"+b.right+"px","height:"+b.bottom+"px"].join(";"),J.c,["left:-"+b.left+"px","top:-"+b.top+"px","width:"+I+"px","height:"+Z+"px"].join(";"),"right -"+b.top+"px")
}return uki.createElement("div","position:absolute;overflow:hidden;"+Y,a.join(""))
};
this._getKey=function(){return uki.map(["v","h","m","c"],function(I){return this._settings[I]&&this._settings[I][0]||""
},this).concat([this._inset,this._bgInset,this._fixedSize]).join(",")
};
this.attachTo=function(I){this._comp=I;
this._container.style.visibility="visible";
this._comp.dom().appendChild(this._container);
if(!uki.supportNativeLayout){this._layoutHandler=this._layoutHandler||uki.proxy(function(J){if(!(this._size&&this._size.eq(J.rect))){this._size=J.rect;
this.layout()
}},this);
this._comp.bind("layout",this._layoutHandler);
this.layout()
}};
this.detach=function(){if(this._comp){this._container.style.visibility="hidden";
uki.supportNativeLayout||this._comp.unbind("layout",this._layoutHandler);
this._size=this._comp=null;
this._attached=this._inited=false
}};
this.layout=function(){var b=this._comp.rect(),Y=this._parts,J=this._inset,I=this._bgInset,Z=this._fixedSize,a=S(Z.width||b.width-I.left-I.right);
b=S(Z.height||b.height-I.top-I.bottom);
I=J.left+J.right;
J=J.top+J.bottom;
if(!Y){Y={};
uki.each(this._container.childNodes,function(){if(this.className){Y[this.className]=this
}});
this._parts=Y
}Y.t&&G.layout(Y.t.style,{width:a-I});
Y.b&&G.layout(Y.b.style,{width:a-I});
Y.l&&G.layout(Y.l.style,{height:b-J});
Y.r&&G.layout(Y.r.style,{height:b-J});
Y.m&&G.layout(Y.m.style,{height:b-J,width:a-I});
G.layout(this._container.style,{width:a,height:b})
}
}));
uki.background.Css=uki.newClass(new (function(){this.init=function(B){this._options=typeof B=="string"?{background:B}:B
};
this.attachTo=function(B){this._comp=B;
this._originalValues={};
uki.each(this._options,function(F,E){this._originalValues[F]=B.style(F);
B.style(F,E)
},this)
};
this.detach=function(){this._comp&&uki.each(this._options,function(B){this._comp.style(B,this._originalValues[B])
},this)
}
}));
uki.background.CssBox=uki.newClass(new (function(){function E(F){B[F]||uki.dom.probe(uki.createElement("div",F+";position:absolute;overflow:hidden;left:-999em;width:10px;height:10px;"),function(G){B[F]=new P(G.offsetHeight-10,G.offsetWidth-10)
});
return B[F]
}var B={};
this.init=function(F,G){this._options=F;
G=G||{};
this._inset=inset=P.create(G.inset)||new P;
this._insetWidth=E(F).left+inset.left+inset.right;
this._insetHeight=E(F).top+inset.top+inset.bottom;
this._container=uki.createElement("div",F+";position:absolute;overflow:hidden;z-index:"+(G.zIndex||"-1")+";left:"+inset.left+";top:"+inset.top+"px;right:"+inset.right+"px;bottom:"+inset.bottom+"px");
this._attached=false
};
this.attachTo=function(F){this._comp=F;
this._comp.dom().appendChild(this._container);
if(!uki.supportNativeLayout){this._layoutHandler=this._layoutHandler||uki.proxy(function(G){this.layout(G.rect)
},this);
this._comp.bind("layout",this._layoutHandler);
this.layout(this._comp.rect())
}};
this.layout=function(F){this._prevLayout=uki.dom.layout(this._container.style,{width:F.width-this._insetWidth,height:F.height-this._insetHeight},this._prevLayout)
};
this.detach=function(){if(this._comp){this._comp.dom().removeChild(this._container);
uki.supportNativeLayout||this._comp.unbind("layout",this._layoutHandler);
this._attached=false
}}
}));
uki.background.Rows=uki.newClass(new (function(){function G(Z,b){var J=Z+" "+b.join(" "),I=[],H=[],Y,a=b.length;
if(!B[J]){for(Y=0;
Y<a;
Y++){I[Y]=['<div style="height:',Z,"px;width:100%;overflow:hidden;",b[Y]?"background:"+b[Y]:"",'"></div>'].join("")
}for(Y=0;
Y<F;
Y++){H[Y]=I[Y%a]
}B[J]=H.join("")
}return B[J]
}var E=this,B=[],F=100;
E.init=function(H,I){this._height=H||20;
this._colors=uki.isArray(I)?I:I.split(" ");
this._packSize=Q(F/this._colors.length)*this._colors.length;
this._renderedHeight=0;
this._visibleExt=200;
if(this._colors.length==1){this._colors=this._colors.concat(["#FFF"])
}};
E.attachTo=function(H){this._comp&&this.detach();
this._comp=H;
if(!this._container){this._container=uki.createElement("div","position:absolute;left:0;top:0;width:100%;z-index:-1")
}this._layoutHandler=this._layoutHandler||uki.proxy(function(I){this.layout(I.rect,I.visibleRect)
},this);
this._comp.dom().appendChild(this._container);
this._comp.bind("layout",this._layoutHandler)
};
E.layout=function(J,Y){for(J=Y?Y.height+this._visibleExt*2:J.maxY();
this._renderedHeight<J;
){var I=F*this._height,H=uki.createElement("div","height:"+I+"px;overflow:hidden;width:100%;",G(this._height,this._colors));
this._renderedHeight+=I;
this._container.appendChild(H)
}if(Y){this._container.style.top=Q((Y.y-this._visibleExt)/this._height/this._colors.length)*this._height*this._colors.length+"px"
}};
E.detach=function(){this._comp.dom().removeChild(this._container);
this._comp.unbind("layout",this._layoutHandler);
this._comp=null
}
}));
uki.theme={themes:[],register:function(B){uki.theme.themes.push(B)
},background:function(E,B){return uki.theme._namedResource(E,"background",B)||new uki.background.Null
},image:function(E,B){return uki.theme._namedResource(E,"image",B)||new Image
},imageSrc:function(E,B){return uki.theme._namedResource(E,"imageSrc",B)||""
},style:function(E,B){return uki.theme._namedResource(E,"style",B)||""
},dom:function(E,B){return uki.theme._namedResource(E,"dom",B)||uki.createElement("div")
},template:function(E,B){return uki.theme._namedResource(E,"template",B)||""
},_namedResource:function(H,E,B){for(var G=uki.theme.themes.length-1;
G>=0;
G--){var F=uki.theme.themes[G][E](H,B);
if(F){return F
}}return null
}};
uki.theme.Base={images:[],imageSrcs:[],backgrounds:[],doms:[],styles:[],templates:[],background:function(E,B){return this.backgrounds[E]&&this.backgrounds[E](B)
},image:function(E,B){if(this.images[E]){return this.images[E](B)
}return this.imageSrcs[E]&&uki.image.apply(uki,this.imageSrcs[E](B))
},imageSrc:function(E,B){if(this.imageSrcs[E]){return uki.imageSrc.apply(uki,this.imageSrcs[E](B))
}return this.images[E]&&this.images[E](B).src
},dom:function(E,B){return this.doms[E]&&this.doms[E](B)
},style:function(E,B){return this.styles[E]&&this.styles[E](B)
},template:function(E,B){return this.templates[E]&&this.templates[E](B)
}};
uki.theme.Template=function(G){G=G.split("${");
var E,B,F;
this.parts=[G[0]];
this.names=[];
E=1;
for(B=G.length;
E<B;
E++){F=G[E].split("}");
this.names.push(F[0]);
this.parts.push("");
this.parts.push(F[1])
}};
uki.theme.Template.prototype.render=function(G){for(var E=0,B=this.names,F=B.length;
E<F;
E++){this.parts[E*2+1]=G[B[E]]||""
}return this.parts.join("")
};
uki.view.utils=new (function(){function B(E){return E.visibleRect?E.visibleRect():E.rect().clone()
}this.visibleRect=function(F,E){var I=[],G,H=F;
do{I[I.length]=H;
H=H.parent()
}while(H&&H!=E);
if(E&&E!=F){I[I.length]=E
}for(F=I.length-1;
F>=0;
F--){H=I[F];
E=B(H);
G=G?G.intersection(E):E;
G.x-=H.rect().x;
G.y-=H.rect().y
}return G
};
this.top=function(E){for(;
E.parent();
){E=E.parent()
}return E
};
this.offset=function(F,E){for(var H=new N,G;
F&&F!=E;
){G=F.rect();
H.x+=G.x;
H.y+=G.y;
if(F.scrollTop){H.x-=F.scrollLeft();
H.y-=F.scrollTop()
}F=F.parent()
}return H
};
this.scrollableParent=function(E){do{if(uki.isFunction(E.scrollTop)){return E
}E=E.parent()
}while(E);
return null
}
});
uki.extend(uki.view,uki.view.utils);
uki.view.Stylable=new (function(){this.style=function(F,G){if(typeof F=="string"){return this._style(F,G)
}uki.each(F,function(H,I){this._style(H,I)
},this);
return this
};
this._style=function(F,G){if(G===undefined){return this._dom.style[F]
}this._dom.style[F]=G;
return this
};
var E=uki.createElement("div").style,B=this;
uki.each(["userSelect","MozUserSelect","WebkitUserSelect"],function(){if(typeof E[this]=="string"){B._textSelectProp=this
}});
this.textSelectable=function(F){if(F===undefined){return this._textSelectable
}this._textSelectable=F;
if(this._textSelectProp){this._dom.style[this._textSelectProp]=F?"":this._textSelectProp=="MozUserSelect"?"-moz-none":"none"
}else{this._dom.unselectable=F?"":"on"
}this._dom.style.cursor=F?"text":"default";
return this
}
});
uki.view.Focusable={_focusable:true,focusable:uki.newProp("_focusable",function(B){this._focusable=B;
if(this._focusableInput){this._focusableInput.style.display=B?"":"none"
}}),disabled:uki.newProp("_disabled",function(B){(this._disabled=B)&&this.blur();
this._focusableInput.disabled=B;
this._updateBg&&this._updateBg()
}),_initFocusable:function(E){if(this._focusable){var B=E;
if(!B){B=uki.createElement("input",uki.view.Base.prototype.defaultCss+"border:none;padding:0;overflow:hidden;width:1px;height:1px;padding:1px;font-size:1px;left:-9999em;top:50%;background:transparent;outline:none;opacity:0;");
this.dom().appendChild(B)
}this._focusableInput=B;
this._hasFocus=false;
this._firstFocus=true;
uki.dom.bind(B,"focus",uki.proxy(function(F){if(!this._hasFocus){this._hasFocus=true;
this._focus(F);
this._firstFocus=false;
this.trigger("focus",{domEvent:F,source:this})
}},this));
uki.dom.bind(B,"blur",uki.proxy(function(F){if(this._hasFocus){this._hasFocus=false;
this._blur(F);
this.trigger("blur",{domEvent:F,source:this})
}},this));
E||this.bind("mousedown",function(){setTimeout(uki.proxy(function(){try{this._hasFocus||this._focusableInput.focus()
}catch(F){}},this),1)
})
}},_focus:function(){},_blur:function(){},focus:function(){this._focusableInput.focus()
},blur:function(){this._focusableInput.blur()
},hasFocus:function(){return this._hasFocus
},_bindToDom:function(B){if(!this._focusableInput||"keyup keydown keypress focus blur".indexOf(B)==-1){return false
}return uki.view.Observable._bindToDom.call(this,B,this._focusableInput)
}};
var W=16,U=32;
uki.view.Base=uki.newClass(uki.view.Observable,uki.view.Stylable,new (function(){function F(H){if(!H){return 0
}var G=0;
if(H.indexOf("width")>-1){G|=W
}if(H.indexOf("height")>-1){G|=U
}return G
}var E=1,B=this;
this.defaultCss="position:absolute;z-index:100;-moz-user-focus:none;font-family:Arial,Helvetica,sans-serif;";
this.init=function(G){this._parentRect=this._rect=C.create(G);
this._setup();
uki.initNativeLayout();
this._createDom()
};
this._setup=function(){uki.extend(this,{_anchors:0,_parent:null,_visible:true,_needsLayout:true,_textSelectable:false,_styleH:"left",_styleV:"top",_firstLayout:true})
};
this.dom=function(){return this._dom
};
this.typeName=function(){return"uki.view.Base"
};
this.id=function(G){if(G===undefined){return this._dom.id
}this._dom.id&&uki.unregisterId(this);
this._dom.id=G;
uki.registerId(this);
return this
};
uki.delegateProp(this,"className","_dom");
this.visible=function(G){if(G===undefined){return this._dom.style.display!="none"
}this._dom.style.display=G?"block":"none";
return this
};
uki.each(["background","shadow"],function(Y,I){var J="_"+I,H="default"+I.substr(0,1).toUpperCase()+I.substr(1),G="_"+H;
B[I]=function(Z){if(Z===undefined&&!this[J]&&this[H]){this[J]=this[H]()
}if(Z===undefined){return this[J]
}Z=uki.background(Z);
if(Z==this[J]){return this
}this[J]&&this[J].detach(this);
Z.attachTo(this);
this[J]=Z;
return this
};
B[H]=function(){return this[G]&&uki.theme.background(this[G])
}
});
this.parent=function(G){if(G===undefined){return this._parent
}this._parent=G;
return this
};
this.childViews=function(){return[]
};
this.prevView=function(){return this.parent().childViews()[this._viewIndex-1]||null
};
this.nextView=function(){return this.parent().childViews()[this._viewIndex+1]||null
};
this.rect=function(G){if(G===undefined){return this._rect
}this._parentRect=G=C.create(G);
this._rect=this._normalizeRect(G);
this._needsLayout=this._needsLayout||E++;
return this
};
this.anchors=uki.newProp("_anchors",function(H){if(H.indexOf){var G=0;
if(H.indexOf("right")>-1){G|=2
}if(H.indexOf("bottom")>-1){G|=4
}if(H.indexOf("top")>-1){G|=1
}if(H.indexOf("left")>-1){G|=8
}if(H.indexOf("width")>-1||G&8&&G&2){G|=W
}if(H.indexOf("height")>-1||G&4&&G&1){G|=U
}H=G
}this._anchors=H;
this._styleH=H&8?"left":"right";
this._styleV=H&1?"top":"bottom"
});
this.rectForChild=function(){return this.rect()
};
this.layout=function(){this._layoutDom(this._rect);
this._needsLayout=false;
this.trigger("layout",{rect:this._rect,source:this});
this._firstLayout=false
};
this.minSize=uki.newProp("_minSize",function(G){this._minSize=R.create(G);
this.rect(this._parentRect);
if(this._minSize.width){this._dom.style.minWidth=this._minSize.width+"px"
}if(this._minSize.height){this._dom.style.minHeight=this._minSize.height+"px"
}});
this.parentResized=function(J,H){var I=this._parentRect.clone(),G=(H.width-J.width)/((this._anchors&8^8?1:0)+(this._anchors&W?1:0)+(this._anchors&2^2?1:0));
J=(H.height-J.height)/((this._anchors&1^1?1:0)+(this._anchors&U?1:0)+(this._anchors&4^4?1:0));
if(this._anchors&8^8){I.x+=G
}if(this._anchors&W){I.width+=G
}if(this._anchors&1^1){I.y+=J
}if(this._anchors&U){I.height+=J
}this.rect(I)
};
this.resizeToContents=function(G){G=F(G);
if(0==G){return this
}this.rect();
this._rect=this._parentRect=this._calcRectOnContentResize(G);
this._needsLayout=true;
return this
};
this.contentsSize=function(){return this.rect()
};
this._normalizeRect=function(G){if(this._minSize){G=new C(G.x,G.y,X(this._minSize.width,G.width),X(this._minSize.height,G.height))
}return G
};
this._initBackgrounds=function(){this.background()&&this.background().attachTo(this);
this.shadow()&&this.shadow().attachTo(this)
};
this._calcRectOnContentResize=function(Y){var I=this.contentsSize(Y),J=this.rect();
if(I.eq(J)){return J
}var H=this.rect().clone(),G=I.width-J.width;
I=I.height-J.height;
if(Y&W){if(this._anchors&8^8&&this._anchors&2^2){H.x-=G/2
}else{if(this._anchors&8^8){H.x-=G
}}H.width+=G
}if(Y&U){if(this._anchors&1^1&&this._anchors&4^4){H.y-=I/2
}else{if(this._anchors&1^1){H.y-=I
}}H.height+=I
}return H
};
uki.each(["width","height","minX","maxX","minY","maxY","left","top"],function(H,G){B[G]=function(I){return uki.attr(this.rect(),G,I)
}
});
this._createDom=function(){this._dom=uki.createElement("div",this.defaultCss)
};
this._layoutDom=function(J){var H={},I=uki.supportNativeLayout,G=this.parent().rectForChild(this);
if(I&&this._anchors&8&&this._anchors&2){H.left=J.x;
H.right=G.width-J.x-J.width
}else{H.width=J.width;
H[this._styleH]=this._styleH=="left"?J.x:G.width-J.x-J.width
}if(I&&this._anchors&1&&this._anchors&4){H.top=J.y;
H.bottom=G.height-J.y-J.height
}else{H.height=J.height;
H[this._styleV]=this._styleV=="top"?J.y:G.height-J.y-J.height
}this._lastLayout=uki.dom.layout(this._dom.style,H,this._lastLayout);
this._firstLayout&&this._initBackgrounds();
return true
};
this._bindToDom=function(G){if("resize layout".indexOf(G)>-1){return true
}return uki.view.Observable._bindToDom.call(this,G)
}
}));
uki.view.Container=uki.newClass(uki.view.Base,new (function(){function E(F,I){var G=0,H;
for(H=F._childViews.length-1;
H>=0;
H--){G=X(G,F._childViews[H].rect()[I]())
}return G
}var B=uki.view.Base.prototype;
this._setup=function(){this._childViews=[];
B._setup.call(this)
};
this.typeName=function(){return"uki.view.Container"
};
this.contentsWidth=function(){return E(this,"maxX")
};
this.contentsHeight=function(){return E(this,"maxY")
};
this.contentsSize=function(){return new R(this.contentsWidth(),this.contentsHeight())
};
this.childViews=function(F){if(F===undefined){return this._childViews
}uki.each(this._childViews,function(H,G){this.removeChild(G)
},this);
uki.each(uki.build(F),function(H,G){this.appendChild(G)
},this);
return this
};
this.removeChild=function(F){F.parent(null);
this.domForChild(F).removeChild(F.dom());
var H,G;
H=F._viewIndex+1;
for(G=this._childViews.length;
H<G;
H++){this._childViews[H]._viewIndex--
}this._childViews=uki.grep(this._childViews,function(I){return I!=F
})
};
this.appendChild=function(F){F._viewIndex=this._childViews.length;
this._childViews.push(F);
F.parent(this);
this.domForChild(F).appendChild(F.dom())
};
this.insertBefore=function(F,I){var G,H;
G=F._viewIndex=I._viewIndex;
for(H=this._childViews.length;
G<H;
G++){this._childViews[G]._viewIndex++
}this._childViews.splice(I._viewIndex,0,F);
F.parent(this);
this.domForChild(F).insertBefore(F.dom(),I.dom())
};
this.domForChild=function(){return this._dom
};
this._layoutDom=function(F){B._layoutDom.call(this,F);
this._layoutChildViews(F)
};
this._layoutChildViews=function(){for(var F=0,G=this.childViews();
F<G.length;
F++){G[F]._needsLayout&&G[F].visible()&&G[F].layout(this._rect)
}};
this.rect=function(F){if(F===undefined){return this._rect
}this._parentRect=F=C.create(F);
var G=this._rect;
if(!this._resizeSelf(F)){return this
}this._needsLayout=true;
if(G.width!=F.width||G.height!=F.height){this._resizeChildViews(G)
}this.trigger("resize",{oldRect:G,newRect:this._rect,source:this});
return this
};
this._resizeSelf=function(F){this._rect=this._normalizeRect(F);
return true
};
this._resizeChildViews=function(F){for(var H=0,G=this.childViews();
H<G.length;
H++){G[H].parentResized(F,this._rect)
}}
}));
uki.view.Box=uki.newClass(uki.view.Container,{typeName:function(){return"uki.view.Box"
}});
uki.view.Image=uki.newClass(uki.view.Base,new (function(){var B=this;
B.typeName=function(){return"uki.view.Image"
};
uki.delegateProp(B,"src","_dom");
B._createDom=function(){this._dom=uki.createElement("img",this.defaultCss)
}
}));
uki.view.Label=uki.newClass(uki.view.Base,new (function(){var E=uki.view.Base.prototype,B=this;
B._setup=function(){E._setup.call(this);
uki.extend(this,{_scrollable:false,_textSelectable:false,_inset:new P})
};
B.typeName=function(){return"uki.view.Label"
};
B._style=function(F,H){var G="fontSize textDecoration color".indexOf(F)>-1?this._label:this._dom;
if(H===undefined){return G.style[F]
}G.style[F]=H;
return this
};
B.textSelectable=function(F){if(F!==undefined&&!this._textSelectProp){this._label.unselectable=F?"":"on"
}return E.textSelectable.call(this,F)
};
B.contentsSize=function(F){var I=this._createLabelClone(F),G=this.inset(),H;
uki.dom.probe(I,function(){H=new R(I.offsetWidth+G.width(),I.offsetHeight+G.height())
});
return H
};
B.text=function(F){return F===undefined?this.html():this.html(uki.escapeHTML(F))
};
B.html=function(F){if(F===undefined){return this._label.innerHTML
}this._label.innerHTML=F;
return this
};
B.inset=uki.newProp("_inset",function(F){this._inset=P.create(F)
});
B.scrollable=uki.newProp("_scrollable",function(F){this._scrollable=F;
this._label.style.overflow=F?"auto":"hidden"
});
B.multiline=uki.newProp("_multiline",function(F){this._multiline=F;
this._label.style.whiteSpace=F?"":"nowrap"
});
B._createLabelClone=function(F){var I=this._label.cloneNode(true),G=this.inset(),H=this.rect();
if(F&W){I.style.width=I.style.right=""
}else{if(uki.supportNativeLayout){I.style.right="";
I.style.width=H.width-G.width()+"px"
}}if(F&U){I.style.height=I.style.bottom=""
}else{if(uki.supportNativeLayout){I.style.bottom="";
I.style.height=H.height-G.height()+"px"
}}I.style.paddingTop=0;
I.style.visibility="hidden";
return I
};
B._createDom=function(){E._createDom.call(this);
this._label=uki.createElement("div",E.defaultCss+"font-size:12px;white-space:nowrap;");
this._dom.appendChild(this._label);
this.textSelectable(this.textSelectable())
};
B._layoutDom=function(){E._layoutDom.apply(this,arguments);
var F=this._inset;
if(!this.multiline()){parseInt(this.style("fontSize"),10);
this._label.style.lineHeight=this._rect.height-F.top-F.bottom+"px"
}F=uki.supportNativeLayout?{left:F.left,top:F.top,right:F.right,bottom:F.bottom}:{left:F.left,top:F.top,width:this._rect.width-F.width(),height:this._rect.height-F.height()};
this._lastLabelLayout=uki.dom.layout(this._label.style,F,this._lastLabelLayout)
}
}));
uki.view.Button=uki.newClass(uki.view.Label,uki.view.Focusable,new (function(){var F=this,E=uki.view.Label.prototype;
F._setup=function(){E._setup.call(this);
uki.extend(this,{_inset:new P(0,4),_backgroundPrefix:"",defaultCss:E.defaultCss+"cursor:default;-moz-user-select:none;-webkit-user-select:none;"})
};
F.typeName=function(){return"uki.view.Button"
};
uki.addProps(F,["backgroundPrefix"]);
uki.each(["normal","hover","down","focus","disabled"],function(I,G){var H=G+"-background";
F[H]=function(J){if(J){this["_"+H]=J
}return this["_"+H]=this["_"+H]||uki.theme.background(this._backgroundPrefix+"button-"+G,{height:this.rect().height,view:this})
}
});
F._createLabelClone=function(G){G=E._createLabelClone.call(this,G);
G.style.fontWeight=this.style("fontWeight");
return G
};
F._layoutDom=function(G){E._layoutDom.call(this,G);
if(this._firstLayout){this["hover-background"]();
this["down-background"]();
this._backgroundByName("normal")
}};
F._updateBg=function(){var G=this._disabled?"disabled":this._down?"down":this._over?"hover":"normal";
this._dom.style.color=this._disabled?"#999":"#333";
this._backgroundByName(G)
};
var B=V.attachEvent&&!V.opera;
F._createDom=function(){this._dom=uki.createElement("div",this.defaultCss+"color:#333;text-align:center;font-weight:bold;");
this._label=uki.createElement("div",E.defaultCss+"font-size:12px;line-height:12px;white-space:nowrap;");
this._dom.appendChild(this._label);
this._dom.attachEvent&&this._dom.appendChild(uki.createElement("div","left:0;top:0;width:100%;height:100%;position:absolute;background:url("+uki.theme.imageSrc("x")+");"));
this.textSelectable(this.textSelectable());
this._initFocusable();
uki.dom.bind(document,"mouseup",uki.proxy(this._mouseup,this));
this.bind("mousedown",this._mousedown);
this.bind(B?"mouseenter":"mouseover",this._mouseover);
this.bind(B?"mouseleave":"mouseout",this._mouseout);
this.bind("keyup",this._keyup);
this.bind("keydown",this._keydown)
};
F._mouseup=function(){if(this._down){this._down=false;
this._updateBg()
}};
F._mousedown=function(){this._down=true;
this._updateBg()
};
F._mouseover=function(G){if(!(!B&&uki.dom.contains(this._dom,G.relatedTarget)||this._over)){this._over=true;
this._updateBg()
}};
F._mouseout=function(G){if(!(!B&&uki.dom.contains(this._dom,G.relatedTarget)||!this._over)){this._over=false;
this._updateBg()
}};
F._focus=function(){this["focus-background"]().attachTo(this)
};
F._keydown=function(G){G=G.domEvent;
if((G.which==32||G.which==13)&&!this._down){this._mousedown()
}};
F._keyup=function(G){G=G.domEvent;
if((G.which==32||G.which==13)&&this._down){this._mouseup();
this.trigger("click",{domEvent:G,source:this})
}G.which==27&&this._down&&this._mouseup()
};
F._blur=function(){this["focus-background"]().detach()
};
F._backgroundByName=function(H){var G=this[H+"-background"]();
if(this._background!=G){this._background&&this._background.detach();
G.attachTo(this);
this._background=G;
this._backgroundName=H
}};
F._bindToDom=function(G){return uki.view.Focusable._bindToDom.call(this,G)||uki.view.Label.prototype._bindToDom.call(this,G)
}
}));
(function(){var B=uki.view.Base.prototype;
uki.view.Checkbox=uki.newClass(uki.view.Base,uki.view.Focusable,{_bindToDom:function(E){" change".indexOf(E)>-1||B._bindToDom.apply(this,arguments)
},_imageSize:18,_setup:function(){B._setup.call(this);
uki.extend(this,{_checked:false,_textSelectable:false,_disabled:false})
},checked:uki.newProp("_checked",function(E){this._checked=!!E;
this._updateBg()
}),_click:function(){if(!this._disabled){this.checked(!this._checked);
this.trigger("change",{checked:this._checked,source:this})
}},_updateBg:function(){var E=this._checked?0:this._imageSize;
E+=this._disabled?this._imageSize*4:this._over?this._imageSize*2:0;
this._image.style.top=-E+"px"
},_createImages:function(){this._image=uki.theme.image("checkbox");
this._focusImage=uki.theme.image("checkbox-focus")
},_createDom:function(){this._createImages();
var F=this._imageSize+"px",E=this._imageSize/2+"px";
this._dom=uki.createElement("div",B.defaultCss+"overflow:visible");
this._box=uki.createElement("div",B.defaultCss+"overflow:hidden;left:50%;top:50%;margin-left:-"+E+";margin-top:-"+E+";width:"+F+";height:"+F);
this._image.style.cssText+=";position:absolute;-webkit-user-drag:none;";
this._image.ondragstart=uki.F;
this._focusImage.style.cssText+="display:block;-webkit-user-drag:none;position:absolute;z-index:-1;left:50%;top:50%;";
this._dom.appendChild(this._box);
this._box.appendChild(this._image);
this._initFocusable();
this.textSelectable(this.textSelectable());
this.checked(this.checked());
uki.dom.bind(this._box,"click",uki.proxy(this._click,this));
uki.dom.bind(this._box,"mouseover",uki.proxy(this._mousover,this));
uki.dom.bind(this._box,"mouseout",uki.proxy(this._mouseout,this));
uki.image.load([this._focusImage],uki.proxy(function(){this._focusImage.style.cssText+=";margin-left:-"+this._focusImage.width/2+"px;margin-top:-"+this._focusImage.height/2+"px"
},this));
this.bind("keyup",this._keyup)
},_keyup:function(E){E=E.domEvent;
if(E.which==32||E.which==13){this._click();
this.trigger("click",{domEvent:E,source:this})
}},_mousover:function(){this._over=true;
this._updateBg()
},_mouseout:function(){this._over=false;
this._updateBg()
},_focus:function(){this._dom.appendChild(this._focusImage)
},_blur:function(){this._dom.removeChild(this._focusImage)
},typeName:function(){return"uki.view.Checkbox"
},_bindToDom:function(E){return uki.view.Focusable._bindToDom.call(this,E)||B._bindToDom.call(this,E)
}})
})();
(function(){var B=uki.view.Radio=uki.newClass(uki.view.Checkbox,new (function(){var E=this;
E.typeName=function(){return"uki.view.Radio"
};
E._createImages=function(){this._image=uki.theme.image("radio");
this._focusImage=uki.theme.image("radio-focus")
};
E.group=uki.newProp("_group",function(F){B.unregisterGroup(this);
this._group=F;
B.registerGroup(this);
B.clearGroup(this)
});
E.checked=uki.newProp("_checked",function(F){this._checked=!!F;
F&&B.clearGroup(this);
this._updateBg()
});
E._click=function(){if(!(this._disabled||this.checked())){this.checked(!this._checked);
this.trigger("change",{checked:this._checked,source:this})
}}
}));
B.groups={};
B.registerGroup=function(F){var E=F.group();
if(B.groups[E]){B.groups[E].push(F)
}else{B.groups[E]=[F]
}};
B.unregisterGroup=function(F){var E=F.group();
if(B.groups[E]){B.groups[E]=uki.grep(B.groups[E],function(G){return G!=F
})
}};
B.clearGroup=function(E){uki.each(B.groups[E.group()]||[],function(F,G){G!=E&&G.checked()&&G.checked(false)
})
}
})();
uki.view.TextField=uki.newClass(uki.view.Base,uki.view.Focusable,new (function(){function H(J){if(!G[J]){var I=uki.createElement("input",B.defaultCss+"border:none;padding:0;border:0;overflow:hidden;font-size:"+J+";left:-999em;top:0");
uki.dom.probe(I,function(Y){G[J]=Y.offsetHeight
})
}return G[J]
}function E(I){return typeof I.placeholder=="string"
}var B=uki.view.Base.prototype,G={},F=this;
F._setup=function(){B._setup.apply(this,arguments);
uki.extend(this,{_value:"",_multiline:false,_placeholder:"",_backgroundPrefix:"",defaultCss:B.defaultCss+"margin:0;border:none;outline:none;padding:0;font-size:11px;left:2px;top:0;z-index:100;resize:none;background: url("+uki.theme.imageSrc("x")+")"})
};
F._updateBg=function(){this._input.style.color=this._disabled?"#999":"#000"
};
F.value=function(I){if(I===undefined){return this._input.value
}this._input.value=I;
this._updatePlaceholderVis();
return this
};
F.placeholder=uki.newProp("_placeholder",function(I){this._placeholder=I;
if(!this._multiline&&E(this._input)){this._input.placeholder=I
}else{if(this._placeholderDom){this._placeholderDom.innerHTML=I
}else{this._placeholderDom=uki.createElement("div",this.defaultCss+"z-input:103;color:#999;cursor:text",I);
this._dom.appendChild(this._placeholderDom);
this._updatePlaceholderVis();
uki.each(["fontSize","fontFamily","fontWeight"],function(Y,J){this._placeholderDom.style[J]=this.style(J)
},this);
uki.dom.bind(this._placeholderDom,"mousedown",uki.proxy(function(J){this.focus();
uki.dom.preventDefault(J)
},this))
}}});
F._style=function(J,I){if(I===undefined){return this._input.style[J]
}this._input.style[J]=I;
if(this._placeholderDom){this._placeholderDom.style[J]=I
}return this
};
uki.addProps(F,["backgroundPrefix"]);
F.defaultBackground=function(){return uki.theme.background(this._backgroundPrefix+"input")
};
F.typeName=function(){return"uki.component.TextField"
};
F._createDom=function(){var I=this._multiline?"textarea":"input";
this._dom=uki.createElement("div",B.defaultCss+";cursor:text;overflow:visible;");
this._input=uki.createElement(I,this.defaultCss+(this._multiline?"":";overflow:hidden;"));
this._inputStyle=this._input.style;
this._input.value=this._value;
this._dom.appendChild(this._input);
this._input.value=this.value();
this._initFocusable(this._input)
};
F._layoutDom=function(){B._layoutDom.apply(this,arguments);
uki.dom.layout(this._input.style,{width:this._rect.width-4});
var I;
if(this._multiline){this._input.style.height=this._rect.height-4+"px";
this._input.style.top="2px";
I="2px 0"
}else{I=(this._rect.height-H(this.style("fontSize")))/2;
I=S(I)+"px 0 "+Q(I)+"px 0";
this._input.style.padding=I
}if(this._placeholderDom){this._placeholderDom.style.padding=I
}this._firstLayout&&this._initFocusable(this._input)
};
F._recalcOffset=function(){};
F._updatePlaceholderVis=function(){if(this._placeholderDom){this._placeholderDom.style.display=this.value()?"none":"block"
}};
F._focus=function(){this._focusBackground=this._focusBackground||uki.theme.background(this._backgroundPrefix+"input-focus");
this._focusBackground.attachTo(this);
if(this._placeholderDom){this._placeholderDom.style.display="none"
}};
F._blur=function(){this._focusBackground.detach();
this._updatePlaceholderVis()
};
F._bindToDom=function(I){return uki.view.Focusable._bindToDom.call(this,I)||B._bindToDom.call(this,I)
}
}));
uki.view.MultilineTextField=uki.newClass(uki.view.TextField,{typeName:function(){return"uki.component.MultilineTextField"
},_setup:function(){uki.view.TextField.prototype._setup.call(this);
this._multiline=true
}});
uki.view.ScrollPane=uki.newClass(uki.view.Container,new (function(){function H(){G||uki.dom.probe(uki.createElement("div","position:absolute;left:-99em;width:100px;height:100px;overflow:scroll;",'<div style="position:absolute;left:0;width:100%;"></div>'),function(I){G=I.offsetWidth-I.clientWidth;
F=I.firstChild.offsetWidth==100
})
}var E=uki.view.Container.prototype,B=this,G,F;
B.typeName=function(){return"uki.view.ScrollPane"
};
B._setup=function(){E._setup.call(this);
uki.extend(this,{_clientRect:this.rect().clone(),_rectForChild:this.rect().clone(),_clientRectValid:false,_scrollableV:true,_scrollableH:false,_scrollV:false,_scrollH:false})
};
uki.addProps(B,["scrollableV","scrollableH"]);
this.rectForChild=function(){return this._rectForChild
};
this.clientRect=function(){return this._clientRect
};
this.scroll=function(J,I){J&&this.scrollTop(this.scrollLeft()+I);
I&&this.scrollTop(this.scrollTop()+I)
};
uki.each(["appendChild","removeChild","childViews"],function(J,I){B[I]=function(Y){this._clientRectValid=false;
return E[I].call(this,Y)
}
});
uki.delegateProp(B,"scrollTop","_dom");
uki.delegateProp(B,"scrollLeft","_dom");
B.visibleRect=function(){var I=this._clientRect.clone();
I.x=this.rect().x+this.scrollLeft();
I.y=this.rect().y+this.scrollTop();
return I
};
B.rect=function(J){if(J===undefined){return this._rect
}J=C.create(J);
var I=this._rect;
this._parentRect=J;
if(!this._resizeSelf(J)){return this
}this._clientRectValid=false;
this._updateClientRects();
this._needsLayout=true;
this.trigger("resize",{oldRect:I,newRect:this._rect,source:this});
return this
};
B._recalcClientRects=function(){H();
this._clientRectValid=true;
var J=this.contentsWidth(),I=this.contentsHeight();
J=this._scrollableH?J>this._rect.width:false;
I=this._scrollableV?I>this._rect.height:false;
this._scrollH=J;
this._scrollV=I;
this._clientRect=new C(this._rect.width+(I?-1:0)*G,this._rect.height+(J?-1:0)*G);
this._rectForChild=new C(this._rect.width+(I&&!F?-1:0)*G,this._rect.height+(J&&!F?-1:0)*G)
};
B._updateClientRects=function(){if(!this._clientRectValid){var I=this._clientRect;
this._recalcClientRects();
if(I.width!=this._clientRect.width||I.height!=this._clientRect.height){this._resizeChildViews(I)
}}};
B._resizeChildViews=function(Y){for(var J=0,I=this.childViews();
J<I.length;
J++){I[J].parentResized(Y,this._clientRect)
}};
B._layoutChildViews=function(){for(var J=0,I=this.childViews();
J<I.length;
J++){I[J]._needsLayout&&I[J].visible()&&I[J].layout()
}};
B._layoutDom=function(I){this._updateClientRects();
if(this._layoutScrollH!==this._scrollH){this._dom.style.overflowX=this._scrollH?"scroll":"hidden";
this._layoutScrollH=this._scrollH
}if(this._layoutScrollV!==this._scrollV){this._dom.style.overflowY=this._scrollV?"scroll":"hidden";
this._layoutScrollV=this._scrollV
}E._layoutDom.call(this,I);
if(this._dom.attachEvent){this._dom.className+=""
}}
}));
uki.view.list={};
uki.view.List=uki.newClass(uki.view.Base,uki.view.Focusable,new (function(){var E=uki.view.Base.prototype,B=this;
B.typeName=function(){return"uki.view.List"
};
B._throttle=5;
B._visibleRectExt=300;
B._defaultBackground="list";
B._setup=function(){E._setup.call(this);
uki.extend(this,{_rowHeight:30,_render:new uki.view.list.Render,_data:[],_selectedIndex:-1})
};
B.defaultBackground=function(){return uki.theme.background("list",this._rowHeight)
};
uki.addProps(B,["render","packSize","visibleRectExt","throttle"]);
B.rowHeight=uki.newProp("_rowHeight",function(F){this._rowHeight=F;
this._background&&this._background.detach();
this._background=null;
this.background()&&this.background().attachTo(this)
});
B.data=function(F){if(F===undefined){return this._data
}this.clearSelection();
this._data=F;
this._packs[0].itemFrom=this._packs[0].itemTo=this._packs[1].itemFrom=this._packs[1].itemTo=0;
this._updateRectOnDataChnage();
this._relayoutParent();
return this
};
B.addRow=function(F,G){this.clearSelection();
this._data.splice(F,0,G);
this.data(this._data)
};
B.removeRow=function(F){this.clearSelection();
this._data.splice(F,1);
this.data(this._data)
};
B.selectedIndex=function(F){if(F===undefined){return this._selectedIndex
}var G=X(0,M((this._data||[]).length-1,F));
this._selectedIndex>-1&&this._setSelected(this._selectedIndex,false);
if(G==F){this._setSelected(this._selectedIndex=G,true)
}return this
};
B.clearSelection=function(){this._selectedIndex>-1&&this._setSelected(this._selectedIndex,false);
this._selectedIndex=-1
};
B.layout=function(){this._layoutDom(this._rect);
this._needsLayout=false;
this.trigger("layout",{rect:this._rect,source:this,visibleRect:this._visibleRect});
this._firstLayout=false
};
B._scrollableParentScroll=function(){if(this._throttle){if(!this._throttleStarted){this._throttleStarted=true;
setTimeout(uki.proxy(function(){this._throttleStarted=false;
this.layout()
},this),this._throttle)
}}else{this.layout()
}};
B._relayoutParent=function(){if(this._scrollableParent){for(var F=this;
F&&F!=this._scrollableParent;
){F._needsLayout=true;
F=F.parent()
}F.layout()
}};
B._updateRectOnDataChnage=function(){this.rect(this._parentRect)
};
B._bindSelectionEvents=function(){this.bind("mousedown",this._mousedown);
this.bind(/mozilla/i.test(A)&&!/(compatible|webkit)/i.test(A)?"keypress":"keydown",this._keypress)
};
B._mousedown=function(F){var G=uki.dom.offset(this._dom);
this.selectedIndex(S((F.domEvent.pageY-G.y)/this._rowHeight))
};
B._keypress=function(F){F=F.domEvent;
if(F.which==38||F.keyCode==38){this.selectedIndex(X(0,this.selectedIndex()-1));
uki.dom.preventDefault(F)
}else{if(F.which==40||F.keyCode==40){this.selectedIndex(M(this._data.length-1,this.selectedIndex()+1));
uki.dom.preventDefault(F)
}}};
B._createDom=function(){this._dom=uki.createElement("div",this.defaultCss+"overflow:hidden");
var F=uki.createElement("div","position:absolute;left:0;top:0px;width:100%;overflow:hidden");
this._packs=[{dom:F,itemTo:0,itemFrom:0},{dom:F.cloneNode(false),itemTo:0,itemFrom:0}];
this._dom.appendChild(this._packs[0].dom);
this._dom.appendChild(this._packs[1].dom);
this._initFocusable();
this._bindSelectionEvents()
};
B._setSelected=function(F,H){var G=this._itemAt(F);
if(G){H&&this._scrollToPosition(F);
this._render.setSelected(G,this._data[F],H,this.hasFocus())
}};
B._scrollToPosition=function(F){var G;
G=(F+1)*this._rowHeight;
F=F*this._rowHeight;
if(G>=this._visibleRect.maxY()){this._scrollableParent.scroll(0,G-this._visibleRect.maxY())
}else{F<this._visibleRect.y&&this._scrollableParent.scroll(0,F-this._visibleRect.y)
}this.layout()
};
B._itemAt=function(F){if(F<this._packs[1].itemTo&&F>=this._packs[1].itemFrom){return this._packs[1].dom.childNodes[F-this._packs[1].itemFrom]
}else{if(F<this._packs[0].itemTo&&F>=this._packs[0].itemFrom){return this._packs[0].dom.childNodes[F-this._packs[0].itemFrom]
}}return null
};
B._focus=function(){this._selectedIndex=this._selectedIndex>-1?this._selectedIndex:0;
this._setSelected(this._selectedIndex,true)
};
B._blur=function(){this._selectedIndex>-1&&this._setSelected(this._selectedIndex,true)
};
B._rowTemplate=new uki.theme.Template('<div style="width:100%;height:${height}px;overflow:hidden">${text}</div>');
B._renderPack=function(F,J,H){var I=[],G=new C(0,J*this._rowHeight,this.rect().width,this._rowHeight);
for(i=J;
i<H;
i++){I[I.length]=this._rowTemplate.render({height:this._rowHeight,text:this._render.render(this._data[i],G,i)});
G.y+=this._rowHeight
}F.dom.innerHTML=I.join("");
F.itemFrom=J;
F.itemTo=H;
F.dom.style.top=J*this._rowHeight+"px";
this._restorePackSelection(F,J,H)
};
B._restorePackSelection=function(F){this._selectedIndex>F.itemFrom&&this._selectedIndex<F.itemTo&&this._render.setSelected(this._itemAt(this._selectedIndex),this._data[position],true,this.hasFocus())
};
B._swapPacks=function(){var F=this._packs[0];
this._packs[0]=this._packs[1];
this._packs[1]=F
};
B._normalizeRect=function(F){F=E._normalizeRect.call(this,F);
if(F.height<this._rowHeight*this._data.length){F=new C(F.x,F.y,F.width,this._rowHeight*this._data.length)
}return F
};
B._layoutDom=function(F){if(!this._scrollableParent){this._scrollableParent=uki.view.scrollableParent(this);
this._scrollableParent.bind("scroll",uki.proxy(this._scrollableParentScroll,this))
}var Y=this._rowHeight*this._data.length;
this._visibleRect=uki.view.visibleRect(this,this._scrollableParent);
var I=Q((this._visibleRect.height+this._visibleRectExt*2)/this._rowHeight),J=X(0,this._visibleRect.y-this._visibleRectExt);
Y=M(Y,this._visibleRect.maxY()+this._visibleRectExt);
var H=this._packs[0].itemFrom*this._rowHeight,G=this._packs[1].itemTo*this._rowHeight;
E._layoutDom.call(this,F);
if(Y<=H||J>=G||Y>G&&this._packs[1].itemFrom*this._rowHeight>this._visibleRect.y&&this._packs[1].itemTo>this._packs[1].itemFrom||J<H&&this._packs[0].itemTo*this._rowHeight<this._visibleRect.maxY()){F=J-this._visibleRectExt/2;
F=X(0,Math.round(F/this._rowHeight));
I=M(this._data.length,F+I);
this._renderPack(this._packs[0],F,I);
this._renderPack(this._packs[1],I,I)
}else{if(Y>G&&this._packs[1].itemTo>this._packs[1].itemFrom){F=this._packs[1].itemTo;
I=M(this._data.length,this._packs[1].itemTo+I);
this._renderPack(this._packs[0],F,I);
this._swapPacks()
}else{if(Y>G){F=this._packs[0].itemTo;
I=M(this._data.length,this._packs[1].itemTo+I);
this._renderPack(this._packs[1],F,I)
}else{if(J<H){F=X(this._packs[0].itemFrom-I,0);
I=this._packs[0].itemFrom;
this._renderPack(this._packs[1],F,I);
this._swapPacks()
}}}}if(this._focusableInput){this._focusableInput.style.top=this._visibleRect.y+"px"
}};
B._bindToDom=function(F){return uki.view.Focusable._bindToDom.call(this,F)||E._bindToDom.call(this,F)
}
}));
uki.Collection.addAttrs("data,selectedIndex");
uki.view.ScrollableList=uki.newClass(uki.view.ScrollPane,new (function(){var E=uki.view.ScrollPane.prototype,B=this;
B.typeName=function(){return"uki.view.ScrollableList"
};
B._createDom=function(){E._createDom.call(this);
this._list=uki({view:"List",rect:this.rect().clone().normalize(),anchors:"left top right bottom"})[0];
this.appendChild(this._list)
};
uki.each(["data","rowHeight","render","packSize","visibleRectExt","throttle","focusable"],function(){uki.delegateProp(B,this,"_list")
})
}));
uki.view.list.Render=uki.newClass({init:function(){},render:function(B){return'<div style="line-height: 30px; text-align: center; font-size: 12px">'+B+"</div>"
},setSelected:function(G,E,B,F){G.style.backgroundColor=B&&F?"#3875D7":B?"#CCC":"";
G.style.color=B&&F?"#FFF":"#000"
}});
uki.view.table={};
uki.view.Table=uki.newClass(uki.view.Container,new (function(){var F=this,E=uki.view.Container.prototype,B=["rowHeight","data","packSize","visibleRectExt","render","selectedIndex","focusable","textSelectable"];
F.typeName=function(){return"uki.view.Table"
};
F._rowHeight=17;
F._headerHeight=17;
F.defaultCss=E.defaultCss+"overflow:hidden;";
F._listImpl="uki.view.List";
uki.each(B,function(H,G){uki.delegateProp(F,G,"_list")
});
F.columns=uki.newProp("_columns",function(G){this._columns=uki.build(G);
for(G=this._totalWidth=0;
G<this._columns.length;
G++){this._columns[G].position(G);
this._columns[G].bind("beforeResize",uki.proxy(function(){this._updateTotalWidth();
this._scrollPane.layout()
},this))
}this._updateTotalWidth();
this._header.columns(this._columns)
});
F._updateTotalWidth=function(){for(var G=this._totalWidth=0;
G<this._columns.length;
G++){this._columns[G].position(G);
this._totalWidth+=this._columns[G].width()
}this._list.minSize(new R(this._totalWidth,0));
this._list.rect(new C(this._totalWidth,this._list.height()));
this._header.minSize(new R(this._totalWidth,0))
};
F._createDom=function(){E._createDom.call(this);
var J=new C(0,this._headerHeight,this.rect().width,this.rect().height-this._headerHeight),H=J.clone().normalize(),I=new C(0,0,this.rect().width,this._headerHeight),G={view:this._listImpl,rect:H,anchors:"left top bottom",render:new uki.view.table.Render(this),className:"table-list"};
J={view:"ScrollPane",rect:J,anchors:"left top right bottom",scrollableH:true,childViews:[G],className:"table-scroll-pane"};
I={view:"table.Header",rect:I,anchors:"top left right",className:"table-header"};
uki.each(B,function(Z,Y){if(this["_"+Y]!==undefined){G[Y]=this["_"+Y]
}},this);
this._scrollPane=uki.build(J)[0];
this._list=this._scrollPane.childViews()[0];
this._header=uki.build(I)[0];
this._scrollPane.resizeToContents();
this.appendChild(this._header);
this.appendChild(this._scrollPane);
this._scrollPane.bind("scroll",uki.proxy(function(){this._header.dom().style.left=-this._scrollPane.scrollLeft()+"px"
},this))
}
}));
uki.Collection.addAttrs("columns");
uki.view.table.Render=uki.newClass(uki.view.list.Render,new (function(){var B=this;
B.init=function(E){this._table=E
};
B.render=function(F,E,H){if(!this._template){this._template=this._buildTemplate(E)
}var G=this._table.columns();
this._template[1]=uki.map(G,function(J,I){return G[I].render(F,E,H)
}).join("");
return this._template.join("")
};
B._buildTemplate=function(E){['<div style="position:relwidth:100%;height:',E.height,'px">'].join(",");
return["","",""]
}
}));
uki.view.table.Column=uki.newClass(uki.view.Observable,new (function(){var B=this;
B._width=100;
B._offset=0;
B._position=0;
B._minWidth=40;
B._css="overflow:hidden;float:left;font-size:11px;line-height:11px;white-space:nowrap;text-overflow:ellipsis;";
B._inset=new P(3,5);
B.init=function(){};
uki.addProps(B,["position","css","formatter","label","resizable","maxWidth","minWidth"]);
B.width=uki.newProp("_width",function(E){this._width=this._normailizeWidth(E);
this.trigger("beforeResize",{source:this});
if(this._stylesheet){(this._stylesheet.styleSheet?this._stylesheet.styleSheet.rules:this._stylesheet.sheet.cssRules)[0].style.width=this._clientWidth()+"px"
}this.trigger("resize",{source:this})
});
B._bindToDom=uki.F;
B._normailizeWidth=function(E){if(this._maxWidth){E=M(this._maxWidth,E)
}if(this._minWidth){E=X(this._minWidth,E)
}return E
};
B.inset=uki.newProp("_inset",function(E){this._inset=P.create(E)
});
B.render=function(F,E){if(!this._template){this._template=this._buildTemplate(E)
}this._template[1]=this._formatter?this._formatter(F[this._position],F):F[this._position];
return this._template.join("")
};
B.renderHeader=function(E){if(!this._headerTemplate){this._headerTemplate=this._buildHeaderTemplate(E)
}E=this._headerTemplate;
E[1]=this.label();
return E.join("")
};
B._clientWidth=function(){return this._width-(uki.dom.offset.boxModel?this._inset.width()+1:0)
};
B._initStylesheet=function(){uki.dom.offset.initializeBoxModel();
if(!this._className){this._className="uki-table-column-"+ ++uki.dom.guid;
var E="."+this._className+" {width:"+this._clientWidth()+"px;}";
this._stylesheet=uki.dom.createStylesheet(E)
}};
B._buildHeaderTemplate=function(F){this._initStylesheet();
var E=this._inset,G=["padding:",E.top,"px ",E.right,"px ",E.bottom,"px ",E.left,"px;"].join("");
F="height:"+(F-(uki.dom.offset.boxModel?E.height()+1:0))+"px;";
return[['<div style="position:relative;border:1px solid #CCC;border-top: none;border-left:none;',G,F,this._css,'" class="',this._className,'">'].join(""),"","</div>"]
};
B._buildTemplate=function(F){this._initStylesheet();
var E=this._inset,G=["padding:",E.top,"px ",E.right,"px ",E.bottom,"px ",E.left,"px;"].join("");
F="height:"+(F.height-(uki.dom.offset.boxModel?E.height():0))+"px;";
return[['<div style="border-right:1px solid #CCC;',G,F,this._css,'" class="',this._className,'">'].join(""),"","</div>"]
}
}));
uki.view.table.NumberColumn=uki.newClass(uki.view.table.Column,new function(){this._css=uki.view.table.Column.prototype._css+"text-align:right;"
});
uki.view.table.CustomColumn=uki.view.table.Column;
uki.view.table.Header=uki.newClass(uki.view.Label,new (function(){var E=uki.view.Label.prototype,B=this;
B._setup=function(){E._setup.call(this);
this._multiline=true
};
B.typeName=function(){return"uki.view.table.Header"
};
B.columns=uki.newProp("_columns",function(F){this._columns=F;
this.html(this._createColumns());
this._createResizers()
});
B._createColumns=function(){for(var F=[],I=0,G=this._columns,H=G.length;
I<H;
I++){F[F.length]=G[I].renderHeader(this.rect().height)
}return F.join("")
};
B._createResizers=function(){for(var F=0,G;
F<this._columns.length;
F++){G=this._columns[F];
if(G.resizable()){G=uki.theme.dom("resizer",{height:this.rect().height});
G.style.right="-2px";
this._label.childNodes[F].appendChild(G);
this._bindResizerDrag(G,F)
}}};
B._bindResizerDrag=function(F,G){uki.dom.drag.watch(F,{_drag:uki.proxy(function(J){var Y=uki.dom.offset(this.dom());
J=J.pageX-Y.x;
Y=0;
var I,H=this._columns[G];
for(I=0;
I<G;
I++){Y+=this._columns[I].width()
}H.width(J-Y)
},this)})
}
}));
(function(){var B=uki.view.Base.prototype;
uki.view.Slider=uki.newClass(uki.view.Base,uki.view.Focusable,{_setup:function(){B._setup.call(this);
uki.extend(this,{_min:0,_max:1,_value:0,_values:null,_keyStep:0.01})
},min:uki.newProp("_min"),max:uki.newProp("_max"),values:uki.newProp("_values"),keyStep:uki.newProp("_keyStep"),value:function(E){if(E===undefined){return this._value
}this._value=X(this._min,M(this._max,E));
this._position=this._val2pos(this._value);
this._moveHandle();
this.trigger("change",{source:this,value:this._value});
return this
},_pos2val:function(E){return E/this._rect.width*(this._max-this._min)
},_val2pos:function(E){return E/(this._max-this._min)*this._rect.width
},_createDom:function(){this._dom=uki.createElement("div",B.defaultCss+"height:18px;-moz-user-select:none;-webkit-user-select:none;overflow:visible;");
this._handle=uki.createElement("div",B.defaultCss+"overflow:hidden;cursor:default;background:url("+uki.theme.image("x").src+")");
this._bg=uki.theme.image("slider-handle");
this._focusBg=uki.theme.image("slider-focus");
this._focusBg.style.cssText+=this._bg.style.cssText+=B.defaultCss+"top:0;left:0;z-index:-1;position:absolute;";
this._handle.appendChild(this._bg);
uki.theme.background("slider-bar").attachTo(this);
this._initFocusable();
uki.image.load([this._bg,this._focusBg],uki.proxy(this._afterHandleLoad,this))
},_afterHandleLoad:function(){this._focusBg.style.cssText+=";z-index:10;margin-left:-"+this._focusBg.width/2+"px;margin-top:-"+(this._focusBg.height-this._bg.height/2+1)/2+"px;";
this._handle.style.cssText+=";margin-left:-"+this._bg.width/2+"px;width:"+this._bg.width+"px;height:"+this._bg.height/2+"px;";
this._dom.appendChild(this._handle);
uki.dom.drag.watch(this._handle,this);
uki.dom.bind(this._handle,"mouseover",uki.proxy(this._mouseover,this));
uki.dom.bind(this._handle,"mouseout",uki.proxy(this._mouseout,this));
this.bind("click",this._click);
this.bind("keydown",this._keydown)
},_mouseover:function(){this._over=true;
this._bg.style.top=-this._bg.height/2+"px"
},_mouseout:function(){this._over=false;
this._bg.style.top=this._dragging?-this._bg.height/2+"px":0
},_click:function(E){E=E.domEvent;
this.value(this._pos2val(E.pageX-uki.dom.offset(this._dom).x))
},_keydown:function(E){E=E.domEvent;
if(E.which==39){this.value(this.value()+this._keyStep*(this._max-this._min))
}else{E.which==37&&this.value(this.value()-this._keyStep*(this._max-this._min))
}},_moveHandle:function(){this._focusBg.style.left=this._handle.style.left=this._position+"px"
},_acceptDrag:function(){this._dragging=true;
this._initialPosition=new N(parseInt(this._handle.style.left,10),parseInt(this._handle.style.top,10));
return true
},_drag:function(F,E){this._position=X(0,M(this._rect.width,this._initialPosition.x-E.x));
this._value=this._pos2val(this._position);
this._moveHandle();
this.trigger("change",{source:this,value:this._value})
},_drop:function(){this._dragging=false;
this._initialPosition=null;
if(!this._over){this._bg.style.top=0
}this._value=this._pos2val(this._position)
},_focus:function(){this._dom.appendChild(this._focusBg);
this._focusBg.style.left=this._handle.style.left
},_blur:function(){this._dom.removeChild(this._focusBg)
},_layoutDom:function(E){E=E.clone();
E.height=18;
B._layoutDom.call(this,E);
this._position=this._val2pos(this._value);
this._moveHandle();
return true
},typeName:function(){return"uki.view.Slider"
},_bindToDom:function(E){if(E=="change"){return true
}return uki.view.Focusable._bindToDom.call(this,E)||B._bindToDom.call(this,E)
}})
})();
uki.view.SplitPane=uki.newClass(uki.view.Container,new (function(){var E=uki.view.Container.prototype,B=this;
B.typeName=function(){return"uki.view.SplitPane"
};
B._setup=function(){E._setup.call(this);
this._originalRect=this._rect;
uki.extend(this,{_vertical:false,_handlePosition:200,_autogrowLeft:false,_autogrowRight:true,_handleWidth:7,_leftMin:100,_rightMin:100,_panes:[]})
};
B.handlePosition=uki.newProp("_handlePosition",function(F){this._handlePosition=this._normalizePosition(F);
this.trigger("handleMove",{source:this,handlePosition:this._handlePosition,dragValue:F});
this._resizeChildViews()
});
B.handleWidth=uki.newProp("_handleWidth",function(F){if(this._handleWidth!=F){this._handleWidth=F;
F=this._createHandle();
this._dom.insertBefore(F,this._handle);
this._removeHandle();
this._handle=F;
this._resizeChildViews()
}});
B._normalizePosition=function(F){var G=this._vertical?"height":"width";
return X(this._leftMin,M(this._rect[G]-this._rightMin-this._handleWidth,X(0,M(this._rect?this._rect[G]:1000,F*1))))
};
uki.addProps(B,["leftMin","rightMin","autogrowLeft","autogrowRight"]);
B.topMin=B.leftMin;
B.bottomMin=B.rightMin;
B._removeHandle=function(){this._dom.removeChild(this._handle)
};
B._createHandle=function(){var F;
if(this._vertical){F=uki.theme.dom("splitPane-vertical",{handleWidth:this._handleWidth});
F.style.top=this._handlePosition+"px"
}else{F=uki.theme.dom("splitPane-horizontal",{handleWidth:this._handleWidth});
F.style.left=this._handlePosition+"px"
}uki.dom.drag.watch(F,this);
return F
};
B._createDom=function(){this._dom=uki.createElement("div",E.defaultCss);
for(var F=0,G;
F<2;
F++){G={view:"Container"};
G.anchors=F==1?"left top bottom right":this._vertical?"left top right":"left top bottom";
G.rect=F==0?this._leftRect():this._rightRect();
this._panes[F]=uki.build(G)[0];
this.appendChild(this._panes[F])
}this._dom.appendChild(this._handle=this._createHandle())
};
B._normalizeRect=function(F){F=E._normalizeRect.call(this,F);
F=F.clone();
if(this._vertical){F.height=X(F.height,this._leftMin+this._rightMin)
}else{F.width=X(F.width,this._leftMin+this._rightMin)
}return F
};
B._resizeSelf=function(F){var H=this._rect,G=this._vertical?"height":"width";
if(!E._resizeSelf.call(this,F)){return false
}if(this._autogrowLeft){H=F[G]-H[G];
this._handlePosition=this._normalizePosition(this._handlePosition+(this._autogrowRight?H/2:H))
}if(this._vertical){if(F.height-this._handlePosition<this._rightMin){this._handlePosition=X(this._leftMin,F.height-this._rightMin)
}}else{if(F.width-this._handlePosition<this._rightMin){this._handlePosition=X(this._leftMin,F.width-this._rightMin)
}}return true
};
B._acceptDrag=function(F){var G=uki.dom.offset(this.dom());
this._posWithinHandle=F[this._vertical?"pageY":"pageX"]-G[this._vertical?"y":"x"]-this._handlePosition;
return true
};
B._drag=function(F){var G=uki.dom.offset(this.dom());
this.handlePosition(F[this._vertical?"pageY":"pageX"]-G[this._vertical?"y":"x"]-this._posWithinHandle);
F.preventDefault?F.preventDefault():(F.returnValue=false);
this.layout()
};
B._drop=function(){};
B.topPane=B.leftPane=function(F){return this._paneAt(0,F)
};
B.bottomPane=B.rightPane=function(F){return this._paneAt(1,F)
};
B.topChildViews=B.leftChildViews=function(F){return this._childViewsAt(0,F)
};
B.bottomChildViews=B.rightChildViews=function(F){return this._childViewsAt(1,F)
};
B._childViewsAt=function(F,G){if(G===undefined){return this._panes[F].childViews()
}this._panes[F].childViews(G);
return this
};
B._paneAt=function(F,G){if(G===undefined){return this._panes[F]
}uki.build.copyAttrs(this._panes[F],G);
return this
};
B._leftRect=function(){return this._vertical?new C(this._rect.width,this._handlePosition):new C(this._handlePosition,this._rect.height)
};
B._rightRect=function(){return this._vertical?new C(0,this._handlePosition+this._handleWidth,this._rect.width,this._rect.height-this._handleWidth-this._handlePosition):new C(this._handlePosition+this._handleWidth,0,this._rect.width-this._handleWidth-this._handlePosition,this._rect.height)
};
B._resizeChildViews=function(){this._panes[0].rect(this._leftRect());
this._panes[1].rect(this._rightRect())
};
B._layoutDom=function(F){E._layoutDom.call(this,F);
this._handle.style[this._vertical?"top":"left"]=this._handlePosition+"px"
};
B._bindToDom=function(F){if(F=="handleMove"){return true
}return E._bindToDom.call(this,F)
}
}));
uki.view.HorizontalSplitPane=uki.view.SplitPane;
uki.view.VerticalSplitPane=uki.newClass(uki.view.SplitPane,{_setup:function(){uki.view.SplitPane.prototype._setup.call(this);
this._vertical=true
}});
uki.Collection.addAttrs("handlePosition");
uki.view.Popup=uki.newClass(uki.view.Container,new (function(){var E=uki.view.Container.prototype,B=this;
B._setup=function(){E._setup.call(this);
uki.extend(this,{_offset:2,_relativeTo:null,_horizontal:false,_flipOnResize:true,_shadow:null,_defaultBackground:"popup-normal",_defaultShadow:"popup-shadow"})
};
B._createDom=function(){E._createDom.call(this);
this.hideOnClick(true)
};
uki.addProps(B,["offset","relativeTo","horizontal","flipOnResize"]);
this.hideOnClick=function(F){if(F===undefined){return this._clickHandler
}if(F!=!!this._clickHandler){if(F){this._clickHandler=this._clickHandler||uki.proxy(function(G){uki.dom.contains(this._relativeTo.dom(),G.target)||uki.dom.contains(this.dom(),G.target)||this.hide()
},this);
uki.dom.bind(D.body,"mousedown",this._clickHandler);
uki.dom.bind(V,"resize",this._clickHandler)
}else{uki.dom.unbind(D.body,"mousedown",this._clickHandler);
uki.dom.unbind(V,"resize",this._clickHandler);
this._clickHandler=false
}}return this
};
B.typeName=function(){return"uki.view.Popup"
};
B.toggle=function(){this.parent()&&this.visible()?this.hide():this.show()
};
B.show=function(){this.visible(true);
if(this.parent()){this.rect(this._recalculateRect());
this.layout(this._rect)
}else{new uki.Attachment(V,this)
}};
B.hide=function(){this.visible(false)
};
B.parentResized=function(){this.rect(this._recalculateRect())
};
B._resizeSelf=function(F){this._rect=this._normalizeRect(F);
return true
};
B._layoutDom=function(F){return E._layoutDom.call(this,F)
};
B._recalculateRect=function(){if(!this.visible()){return this._rect
}var F=uki.dom.offset(this._relativeTo.dom()),Z=this._relativeTo.rect(),J=this.rect().clone(),Y=uki.view.top(this);
Y.rect();
Y=uki.dom.offset(Y.dom());
var I=new N,H=this._horizontal?this._offset:0,G=this._horizontal?0:this._offset;
F.offset(-Y.x,-Y.y);
I.x=this._anchors&2?F.x+Z.width-(this._horizontal?0:J.width)+H:F.x-(this._horizontal?J.width:0)-H;
I.y=this._anchors&4?F.y+(this._horizontal?Z.height:0)-J.height-G:F.y+(this._horizontal?0:Z.height)+G;
return new C(I.x,I.y,J.width,J.height)
}
}));
uki.each(["show","hide","toggle"],function(E,B){uki.fn[B]=function(){this.each(function(){this[B]()
})
}
});
uki.view.VerticalFlow=uki.newClass(uki.view.Container,new (function(){var E=uki.view.Container.prototype,B=this;
B._setup=function(){E._setup.call(this);
uki.extend(this,{_horizontal:false,_dimension:"height",_containers:[],_containerSizes:[],defaultCss:this.defaultCss+"overflow:hidden;"})
};
B.typeName=function(){return"uki.view.VerticalFlow"
};
B.horizontal=uki.newProp("_horizontal",function(F){this._dimension=F?"width":"height"
});
B.appendChild=function(F){var H=this._createContainer(F),G=this._childViews.length;
this._containers[G]=H;
this._containerSizes[G]=F.rect()[this._dimension];
this._dom.appendChild(H);
E.appendChild.call(this,F)
};
B.insertBefore=function(F,I){var G=this._createContainer(F),H=I._viewIndex;
this._dom.insertBefore(G,this._containers[H]);
this._containers.splice(H,0,G);
this._containerSizes.splice(H,0,F.rect()[this._dimension]);
E.insertBefore.call(this,F,I)
};
B.removeChild=function(F){var G=this._containers[F._viewIndex];
E.removeChild.call(this,F);
this._dom.removeChild(G);
this._containers=uki.grep(this._containers,function(H){return H!=G
})
};
B.domForChild=function(F){return this._containers[F._viewIndex]
};
B.contentsSize=function(){var F=this._dimension,G=uki.reduce(0,this._childViews,function(H,I){return H+I.rect()[F]
});
return this._horizontal?new R(G,this.contentsHeight()):new R(this.contentsWidth(),G)
};
B._updateSize=function(F){var H=this.rect(),G;
if(this._horizontal){G=H.width+F;
F=H.height
}else{G=H.width;
F=H.height+F
}this.rect(new C(H.x,H.y,G,F))
};
B._createDom=function(){E._createDom.call(this);
for(var F=0;
F<this._containers.length;
F++){this._initContainer(this._containers[F]);
this._dom.appendChild(this._containers[F])
}};
B._initContainer=function(F){if(this._horizontal){F.style.cssText+=";float:left";
F.style.height=this.rect().height+"px"
}};
B._layoutDom=function(F){E._layoutDom.call(this,F);
var I,G,H;
F=0;
for(I=this._containers.length;
F<I;
F++){G=this._containers[F];
H=this._childViews[F].rect()[this._dimension];
if(H!=this._containerSizes[F]){G.style[this._dimension]=H+"px";
this._containerSizes[F]=H
}}};
B._createContainer=function(F){var G=uki.createElement("div","position:relative;top:0;left:0;width:100%;padding:0;");
G.style[this._dimension]=F.rect()[this._dimension]+"px";
this._initContainer(G);
return G
}
}));
uki.view.HorizontalFlow=uki.newClass(uki.view.VerticalFlow,{_setup:function(){uki.view.VerticalFlow.prototype._setup.call(this);
this._horizontal=true
},typeName:function(){return"uki.view.HorizontalFlow"
}});
uki.view.toolbar={};
uki.view.Toolbar=uki.newClass(uki.view.Container,new (function(){var E=uki.view.Container.prototype,B=this;
B.typeName=function(){return"uki.view.Toolbar"
};
B._moreWidth=30;
B._setup=function(){E._setup.call(this);
this._buttons=[];
this._widths=[]
};
this.buttons=uki.newProp("_buttons",function(F){this._buttons=F;
this._flow.childViews(uki.build(uki.map(this._buttons,this._createButton,this)).resizeToContents("width"));
this._totalWidth=uki.reduce(0,this._flow.childViews(),function(H,G){return H+G.rect().width
})
});
uki.moreWidth=uki.newProp("_moreWidth",function(F){this._moreWidth=F;
this._updateMoreVisible()
});
B._createDom=function(){E._createDom.call(this);
var F=this.rect(),H=F.clone().normalize();
F={view:"Button",rect:new C(F.width-this._moreWidth,0,this._moreWidth,F.height),anchors:"right top",className:"toolbar-button",visible:false,backgroundPrefix:"toolbar-more-",text:">>",focusable:false};
var G={view:"Popup",rect:"0 0",anchors:"right top",className:"toolbar-popup",background:"theme(toolbar-popup)",shadow:"theme(toolbar-popup-shadow)",childViews:{view:"VerticalFlow",rect:"0 0",anchors:"right top left bottom"}};
this._flow=uki.build({view:"HorizontalFlow",rect:H,anchors:"left top right",className:"toolbar-flow",horizontal:true})[0];
this._more=uki.build(F)[0];
this.appendChild(this._flow);
this.appendChild(this._more);
G.relativeTo=this._more;
this._popup=uki.build(G)[0];
this._more.bind("click",uki.proxy(this._showMissingButtons,this))
};
B._showMissingButtons=function(){for(var F=this._flow.rect().width,Y=0,I=[],J=0,H=this._flow.childViews(),G=H.length;
J<G;
J++){Y+=H[J].rect().width;
Y>F&&I.push(J)
}F=uki.map(I,function(Z){var a={html:H[Z].html(),backgroundPrefix:"toolbar-popup-"};
uki.each(["fontSize","fontWeight","color","textAlign","inset"],function(b,c){a[c]=uki.attr(H[Z],c)
});
return this._createButton(a)
},this);
uki("VerticalFlow",this._popup).childViews(F).resizeToContents("width height");
this._popup.resizeToContents("width height").toggle()
};
B._updateMoreVisible=function(){var F=this._rect;
if(this._more.visible()!=F.width<this._totalWidth){this._more.visible(F.width<this._totalWidth);
var G=this._flow.rect();
G.width+=(F.width<this._totalWidth?-1:1)*this._moreWidth;
this._flow.rect(G)
}};
B.rect=function(F){var G=E.rect.call(this,F);
F&&this._updateMoreVisible();
return G
};
B._createButton=function(F){return uki.extend({view:"Button",rect:new C(100,this.rect().height),focusable:false,align:"left",anchors:"left top",backgroundPrefix:"toolbar-",autosizeToContents:"width",focusable:false},F)
}
}))
})();
(function(){function A(C){return uki.theme.airport.imagePath+C
}function B(){return{c:[A("shadow/large-c.png"),"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAYAAABXuSs3AAACzklEQVRo3t2a63KiUBCEPYCX1U2Ixvd/Qm/kYjRBWd2aTjW950CS3fyYtaprULl8p2kGAcMg/QqR6SDTsXk/8moi041Mx+bt3WAKVDVIDOQj0ArcROCbFHzoAGbYTICzLwygC/jc8T62bGccFDKLKLUXeH2625sIpCo2mBa8bkiBWbkpo5oaQMrxFPCJ6ikxkNYAQg90Tiqk5h0DiDmeAoZqqTqIFrxuSB0uSENTQVUHkHJdnVbgN6qYrmkQ6n7U6VygRwY6Eg1pHiyDdcQcx0YZGLCvInxWyx44q+Nwi6Hh8Ng0kTqieTQ2QcCbSDzeCPB40UHqUfYAlvu9Lu0aDD0i0B+iiQnup1wfdLgNdw+mFxEG8CrwZziuB6JCT00zqQyfcn3Q4TZD7y96lrqPwL9HJkiLKygecPcK+tN0Y3VG348lMlnC8bNE5EjuXmGfLnq0+mSf4fujuh6kM8DtCUHfmG6pMry63uc4u83QDwaO+kjwB3U9SD45InD61lSS4PzU4GNxUXCNyYvFAU5XpAcTnOfI/AFeiNuIxhX0TgT3pxKXoge8lpjsyeWdqKLosOs1wIcEzgck3L6Czk0Le1/ad7O/BH826MpgNxdtTTtynQ/UFngh4DNym6HvbfqO4oKcfwYc+UZMdga7FviKss7gdbB45NJNAA637wl8QXFBzsfSz7vAccLZ00EJt9dU4TofpOgup0AbLKSbICYAZiEu3NM/6zh6NmKyFm0oLtxdWo5z/8ZJpiTwpYDPxfGvgsPxrUCvCLyik9J7P1dw7igAB+zStDDw8h+BVwa+MeAVDQDg3FmS4NxR5gTN9TvA1wS9opxrZ+kFL6mbLEnfDb6iqGzJ8f8f3F1UXB6cLtuhyxOQy1O+2x9Zbn/Wur2QcHvp5vZi2e3tCbc3hNzegnN709P1bWaXN/bdPkpx/fDK9eNCtw9oXT8Sd/MnhF+iLpLibpmRrgAAAABJRU5ErkJggg==",A("shadow/large-c.gif")],v:[A("shadow/large-v.png"),"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAECAYAAADxjg1nAAAAWklEQVQYGdXBWwpAQAAAwLEeSUqy9z/hSkpSnh9OsTMFGlSo0aJDjwEjJkREREwYMaBHhxY1KpQIKPxePLhx4cSBHRtWLJiRkJAwY8GKDTsOnLiCTAWZCjL1AeihFg5/1kytAAAAAElFTkSuQmCC",A("shadow/large-v.gif")],h:[A("shadow/large-h.png"),"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAuCAYAAAAPxrguAAAAe0lEQVQoz5XSWwtAQBCG4XEMOST+/y8kOYScKRe8WzZbc7FPX7PNtLaIuPI49l0vUBIewT/LuO/7BRETMRMpExkh/w9KD+WVhBASAu20jnZjFsEkGAQh7ISNsBIWwkwYCT2hI9SEilASiv+g9KgEH6ZhomVi0E47fW7sAEmnGr/QVlzBAAAAAElFTkSuQmCC",A("shadow/large-h.gif")],m:[A("shadow/large-m.png"),"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAEUlEQVQIHWNgYGD4i4ZJFQAAAkoP0RsgosoAAAAASUVORK5CYII=",A("shadow/large-m.gif"),true]}
}uki.theme.airport=uki.extend({},uki.theme.Base,{imagePath:"http://static.ukijs.org/pkg/0.0.8a/uki-theme/airport/i/",backgrounds:{"button-normal":function(){return new uki.background.Sliced9({c:[A("button/normal-c.png"),"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAAS0lEQVQIW2NgAILy8vL/yJgBJrh+/fr/MABigyVBxN9//1EwXGLGrDn/j5++9P/G7Qf/t+/YBZEA6k5LTU39j4xBYmB7QAxkDBIDALKrX9FN99pwAAAAAElFTkSuQmCC",A("button/normal-c.gif")],v:[A("button/normal-v.png"),"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAATCAYAAACz13xgAAAAT0lEQVQYlZXPMQ6AQAhE0b9m78zZFca1sdEwxZLQ8MIQiIh1XuvTEbEmQOnmXxNAVT2UB5komY1MA5KNys3jHlyUtv+wNzhGDwMDzfyFRh7wcj5EWWRJUgAAAABJRU5ErkJggg==",false,true],h:[A("button/normal-h.png"),"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH8AAAAGCAYAAADqkEEaAAAAMklEQVRIie3DUQ0AIAxDwZodFmaVhB+MjIeQ9pJTd5OeRdjSPEjP2ueSnlVVpGcBKz1/kUWrDOOOWIQAAAAASUVORK5CYII=",A("button/normal-h.gif")],m:[A("button/normal-m.png"),"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH8AAAATCAYAAAC5i9IyAAAAXklEQVQYGe3BgRHDMAACsXeP/fdtDUkHAUnf3/syleQ8TCfFZjrJNtNJdphOSsx00r1mOikJ00nJZTrJDtNJdphOci7TSXGYTkrMdJIdppP4HKaTDofpJA5TSnCYTn/FLC2twbqbSQAAAABJRU5ErkJggg==",null,true]},"3 3 3 3")
},"button-hover":function(){return new uki.background.Sliced9({c:[A("button/hover-c.png"),"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAAS0lEQVQIW2NgAILy8vL/yJgBJrh+/fr/MABigyVBxN9//1EwXGL+wqX/b9579v/Ji3f/9+w9AJEA6m5ITU39j4xBYmB7QAxkDBIDAN/zYPRpDtd1AAAAAElFTkSuQmCC",A("button/hover-c.gif")],v:[A("button/hover-v.png"),"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAATCAYAAACz13xgAAAAT0lEQVQY062PMQ7AIAwDj8Kf83gw7tKlhQxItZTp5EtCRLh3vyYi3AA0J980gJmBoayh31S290DS4Q4pUzlTjdOr0j9KLXvAanrAWuAiyQ2Hqz+Eaxa7lwAAAABJRU5ErkJggg==",false,true],h:[A("button/hover-h.png"),"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH8AAAAGCAYAAADqkEEaAAAAM0lEQVRIS+3DsREAIAwDMS+bGdIyLAUVG4RnEFt3UneTnkXY0jxIz9rnkp5VVaRnASs9f4uJy0upJnsYAAAAAElFTkSuQmCC",A("button/hover-h.gif")],m:[A("button/hover-m.png"),"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH8AAAATCAYAAAC5i9IyAAAAXElEQVQYGe3BgRHAMAABQLnaf+EEHYR/3ptgKlE2phNtYzrxyZhOtIzpRNuYTnwyphOTYDpREqYTbWM6UQqmExVhOtHPmE5MgunEJ2M68XwH04kIphRxMKWIqfUDGFEu5jKnhiUAAAAASUVORK5CYII=",null,true]},"3 3 3 3")
},"button-down":function(){return new uki.background.Sliced9({c:[A("button/down-c.png"),"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAAR0lEQVQIW2NgAIKGhob/yJgBJlhQUPg/JTUDjEFssCSIyC8o+l9b1wjGIDZcoq9v4v9tO/aDMYiNYhyGHSDw////NGQMEgMAouBOxXrB3FIAAAAASUVORK5CYII=",A("button/down-c.gif")],v:[A("button/down-v.png"),"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAATCAYAAACz13xgAAAAkUlEQVQYV42Nuw4CMQwEHT9ojvvnNPTQ8LfIeH3BmKuwNMomI294zulz3vz+eCbIeGOK2a4b7fueIGNSmF1IRBPkEqxMYpIgl1A2UllE/m5IbCyQS4hEjS4iN6FHXYDcBCokkV7FrYp7lcXFVA+6oME0xkiQS3weS9YGj19q48QfVbQ+zY+b4BMlXu7kcfrKmDdNVhnN3VjMVQAAAABJRU5ErkJggg==",false,true],h:[A("button/down-h.png"),"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH8AAAAGCAYAAADqkEEaAAAARklEQVQYGe3BsQ2AQAwDQNvD0oCYIQ0UbIVExVDxDxLfsaqMGIn7cVoSYpbuBq/7sSTELN0Nvt9vgohZDINVZcRItL0hRloovBiO+VNuegAAAABJRU5ErkJggg==",A("button/down-h.gif")],m:[A("button/down-m.png"),"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH8AAAATCAYAAAC5i9IyAAAAa0lEQVQYGe3BsREDQQwDseWJF/n7n3lH7lQuhAT8fn8rUWF2wc/zQRKVZXexfalMnjtUJnsulckzQ2XyeKhM9lwqk2eGyuTxUJl8bSqTpUNlsiQqkzmiMllUKkuiMhkdKpMPlcoLSKKy7C5/du0Mt289U6QAAAAASUVORK5CYII=",null,true]},"3 3 3 3")
},"button-focus":function(){if(uki.image.needAlphaFix){return new uki.background.CssBox("filter:progid:DXImageTransform.Microsoft.Blur(pixelradius=3);background:#7594D2;",{inset:"-5 -5 -4 -5",zIndex:-2})
}return new uki.background.Sliced9({c:[A("button/focusRing-c.png"),"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAtUlEQVQokWNgQABGBof9LNqhq9hkQo9xgjCIDRIDy6GA0FXMKp7b2NX9jvCqJB4S1Y47IgfCIDZYDCgHUgM3GSSgkLBfQCfxoKxO3Ak93fijdiAMYoPEQHJgTWCbgFaCTAFJ6MafMNZNPOGvl3AiC4RBbJAYSA6kBuw8kDtBVoNNBis+WQWzGsQGiYHkwE4F+QnsOaB7QU4AmcqABsA2AeVAakBqSddAspNI9jTpwUpGxJGUNADqMZr1BXNgDAAAAABJRU5ErkJggg=="],v:[A("button/focusRing-v.png"),"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAUCAYAAAC58NwRAAAAf0lEQVQoU2MQj93JrZlwQlUn/qS3TsLJegY0ABIDyYHUgNQyqPsd4dWJPa6pl3giRDfxeB+6BpAYSA6kBqSWQSl0N79m7FEdvcSTkUA8DV0DSAwkB1IDUgvWoBN3Qk83/ni0buKJGegaQGIgOZCaUQ2jGgZeA0nJm+QMRGoWBQCeEP1BW4HCpgAAAABJRU5ErkJggg=="],h:[A("button/focusRing-h.png"),"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIEAAAAMCAYAAABFjt5WAAAAlElEQVRYw+2YMQoCMRBFpxextBcWCUxykQUrLUTibk7iDbYUryK2SpJbubN7jLwHr0n7msmXfXxvjqfv9nD57LAtrbv1FzeWTmN2Lv5U7yVgGy69rfvcX3SofUjlHFK9+iHfsA2tt3W3/qJjffiUp/nx6VN5YRuuvfNk/QUAAADA4DDkMOSLyBexZyxiLOqE2ZjZ+A+dZWjNi3C4GwAAAABJRU5ErkJggg=="]},"6 6 6 6",{inset:"-4 -4 -3 -4",zIndex:2})
},"toolbar-button-normal":function(){return new uki.background.Css("#CCC")
},"toolbar-button-hover":function(){return new uki.background.Css("#E0E0E0")
},"toolbar-button-down":function(){return new uki.background.Css("#AAA")
},"toolbar-button-focus":function(){return new uki.background.Css("#CCC")
},"toolbar-popup-button-hover":function(){return new uki.background.Css({background:"#4086FF",color:"#FFF"})
},panel:function(){return new uki.background.Sliced9({h:[A("panel/dark-h.png"),"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAAGCAYAAADpJ08yAAAAIElEQVQIW2NcvnzFfwYgYLx37z4aY8aMmWgMIJ4JYgAAGzEQWXMYYT0AAAAASUVORK5CYII=",A("panel/dark-h.gif")],m:[A("panel/dark-m.png"),"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAABlCAYAAABnRzLGAAAAPUlEQVQoz2O5e/fefwYgYGGAAgTj////DERLkaSY6lLkKaaQATfw379/BNVgSsF1Ud1hw5VBYYBTaCntGQBCJspdTUaYMwAAAABJRU5ErkJggg==",false,true]},"3 0 3 0")
},input:function(){return new uki.background.CssBox("background:white;border: 1px solid #787878;border-top-color:#555;-moz-border-radius:2px;-webkit-border-radius:2px;border-radius:2px;-moz-box-shadow:0 1px 0 rgba(255, 255, 255, 0.4);-webkit-box-shadow:0 1px 0 rgba(255, 255, 255, 0.4);box-shadow:0 1px 0 rgba(255, 255, 255, 0.4)",{inset:"0 0 1 0"})
},"slider-bar":function(){return new uki.background.Sliced9({v:[A("slider/bar-v.png"),"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAASCAYAAAB4i6/FAAAASUlEQVQY02NgGHqgvLz8PzKGC7a0tP1ftnwNGIPYYEkQsW//0f/Hjp8FYxAbLjFjxiy4BIgNlvj//38auh0gMbA9IAYyHvDQAACE3VpNVzKSLwAAAABJRU5ErkJggg==",A("slider/bar-v.gif")],m:[A("slider/bar-m.png"),"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAASCAYAAAB4gjqpAAAAUUlEQVQYGe3BwRFAMBAAwItJIVTAR0taSE9eVHiKOA9jdjcCAAAAAAAAgJ9rY4wMgKK+bnsAVPV5XgKgagqAF/T7OgOgqmXmEQAAAAAAAHzTAx6DCNiUJps4AAAAAElFTkSuQmCC",A("slider/bar-m.gif"),true]},"0 3 0 3",{fixedSize:"0 18"})
},list:function(C){return new uki.background.Rows(C,"#EDF3FE")
},"popup-normal":function(){return new uki.background.CssBox("opacity:0.95;background:#ECEDEE;-moz-border-radius:5px;-webkit-border-radius:5px;border-radius:5px;border:1px solid #CCC")
},"shadow-big":function(){return new uki.background.Sliced9(B(),"23 23 23 23",{zIndex:-2,inset:"-4 -10 -12 -10"})
},"shadow-medium":function(){return new uki.background.Sliced9(B(),"23 23 23 23",{zIndex:-2,inset:"-1 -6 -6 -6"})
}},images:{"slider-handle":function(){return uki.image(A("slider/handle.gif"),"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAkCAYAAACwlKv7AAABcUlEQVQ4T7WSy0sCYRRH758b0aKFCwmjB1kwlGEIJQiVvRe6iajIVpGbJArKjWK0GCgq7DE2muJt7kf3cmeaBlz0wVl8Z34Dw3AAvLNbqmIUtIHNo2sk/jr8HNb2K/jV60dCG8gVy9jq9IThsXmDdrQxw2arKySzRYN2mcIpQma7hE/vHYHuYQ5SG8doN9sC3cMcWKsHeP/sCnQPc5BcKWDtoSXwN/qct4GZzA5WbUcgSWhHG5hczP+SwZdpAwkrhxeNN2EivWXQjjYQn13Gcu1VSKTWDdrRBmJTS/6h9zahHW1gdHwBT25fIqENjMTnkND/TcPPTWpDsWmMAgY+AxXedZxQfIXffWIkUriWXLh2UvjlIwpcj3ZSuE/+FB50pvAzGwUuPOhM4aVGX+DCg84UfljvCvyNPseFF6oocOHaSeF7N22BC9dOCs9fuQIXrp0Unq24AheunRSeLjsCF66dFG6df0TiK7xid0L5v8K/AYNKQJdGv2S4AAAAAElFTkSuQmCC")
},"slider-focus":function(){if(uki.image.needAlphaFix){var C=new uki.createElement("div","width:12px;height:18px;filter:progid:DXImageTransform.Microsoft.Blur(pixelradius=4);background:#7594D2;");
C.width=20;
C.height=28;
return C
}return uki.image(A("slider/focus.png"),"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAZCAYAAAA8CX6UAAABUUlEQVQ4y+2VsUoDQRCGVxRFRLQRGxUJETmyd4292IoQm1wRwuVuWx/BxjewDHmGPIAgFkFJvL23cr45MVhli20EFxaW2f//b+afvV1jVmPD3My3evls+yT/3D0uXvcu+4v9Tv52wGRNjD0wYJXza+Szze7tyw7grvs46o0XZ0nlL2xRJ0mxtExdS4w9MIoVDtyfTAicV/ND695P7dhnabm8tmVzlzk/yFwzbKcfENM9wYCFo2KamaSIOhtp6a9S5++zyj/YqnlKXf0sIhMma2LsgQELB66WSb2kqpmoSPNo1gwwYOGoFXim5kndpMzXTODQzIQDFw1DJ9RYqZ/UQ4XAwoGLhlF/pCOYiQ+hQq1/0gDhqk+cEdr73Z1JcGltE4Zw0VChtuX1SAychmfkp3Dg/gv9aaEo5yjayY72r0X7+6PdR9FuyHh3dsRXJMq79gUgPopCCBOTpwAAAABJRU5ErkJggg==")
},checkbox:function(){return uki.image(A("checkbox/normal.png"),"data:image/png;base64,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",A("checkbox/normal.gif"))
},"checkbox-focus":function(){if(uki.image.needAlphaFix){var C=new uki.createElement("div","width:18px;height:18px;filter:progid:DXImageTransform.Microsoft.Blur(pixelradius=3);background:#7594D2;");
C.width=26;
C.height=26;
return C
}return uki.image(A("checkbox/focus.png"),"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABdklEQVRIie2Wv0rDUBSHUxRFRHQRFxWRioTeZHEXVxHqYgaRNrmrj+Ai+AAdi6trH0AQh6K05uYpfBQ934m0EnHQcIuDB+5y7/l9J+dPchMEU2sER8P5VjJY2ExeljY6D8v77dHKbvK4+t3iHD/80aFXzhdLBnPN4/tFBE37vN7qjrbDzO2ZTh6GnbExXRdXl+5zLn74o1O9cOB9xjfY3MmGa8Y+bSGO0vGhSYuT2Lqz2BbnUZpfVBf7nOOn/gQWPRwNMslE0iIyh1HqDiLrTuPMXZqsuI5s3hNQX/Zuq6vcz3v44Y8OPRx4H+UKAmpHevrkCi+ubu5e33660KGHo2WmJ5g2SGpImjzJb+DTIJKJcODB1QBMgTZUakm6dQKghwMPrgbQ+ss00DBqWidA2TNpvPC0DxjzzMiVU1H0a5VI9HDgwZ0EKEdTxk+mo14GMmHCgfcf4I8F8DpF3t8D72+y92+R96+p9/vA/402gzt5Bn8VHu0d2HhIetPffvAAAAAASUVORK5CYII=")
},radio:function(){return uki.image(A("radio/normal.png"),"data:image/png;base64,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",A("radio/normal.gif"))
},"radio-focus":function(){if(uki.image.needAlphaFix){return uki.theme.airport.image("checkbox-focus")
}return uki.image(A("radio/focus.png"),"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABcElEQVRIx92VP0oEMRTGt9ADeAERq21E8ACLNp7AUrRbWdzdDDa6IBhnM5YqaCPCiiewyPzBA1gK1oIsHsNCNL9owBl1HYWM6MBjSPK+7+W99yWp1X7jm5dyrLUVTwTyYqotdb0dJjOdUM86Y8w86/jhX5q82TwZF1JPrkd6rtNPF40tiTBb7qps1Rlj5lnHD39wpchbMp4WKmmIKF0x/+0gSg8DlZ0KlZ05Y8w8669+DXAjgzjy7m68IPrJmoiS/Y29S907vr7fGdw+hOfDJ2eMmWcdP/zBfRqEGpKm3TnkKj3aPLi6kYO7x7fERWMdP/xfcAZveN71hEbZWpKu2RGgUcRFs0HIxODhgS8XADXQMGpK2l/t/KNMbLkMHh74cgGQHKqgcdT2O+TOwIGHB758AKNrpIc6ig0ta+Cs2gwPfLkAHB6rbyPBn5A7Aw8PfP8sgPceeFeR93Pg/SR7v4u836aVvAeVvGiVvMl/7nsGaBHOn+3vxvEAAAAASUVORK5CYII=")
}},imageSrcs:{x:function(){return[A("x.gif"),"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIHWNgAAIAAAUAAY27m/MAAAAASUVORK5CYII="]
},"splitPane-horizontal":function(){return[A("splitPane/horizontal.gif"),"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAICAYAAAA870V8AAAAFUlEQVQIW2MoLy//zwAEYJq6HGQAAJuVIXm0sEPnAAAAAElFTkSuQmCC"]
},"splitPane-vertical":function(){return[A("splitPane/vertical.gif"),"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAADCAYAAABfwxXFAAAAE0lEQVQIHWMsLy//z0AOYMSnEwAIngTLoazFLgAAAABJRU5ErkJggg=="]
}},doms:{resizer:function(D){var C=new uki.theme.Template("position:absolute;width:5px;top:0;height:${height}px;cursor:col-resize;cursor:ew-resize;z-index:101;background:url("+uki.theme.imageSrc("x")+")");
D=uki.createElement("div",C.render(D));
if(!D.style.cursor||window.opera){D.style.cursor="e-resize"
}return D
},"splitPane-vertical":function(C){C=C.handleWidth==1?uki.createElement("div","position:absolute;z-index:100;-moz-user-focus:none;font-family:Arial,Helvetica,sans-serif;width:100%;height:5px;margin-top:-2px;cursor:row-resize;cursor:ns-resize;z-index:200;overflow:hidden;background: url("+uki.theme.imageSrc("x")+")",'<div style="position:absolute;z-index:100;-moz-user-focus:none;font-family:Arial,Helvetica,sans-serif;background:#999;width:100%;height:1px;left:0px;top:2px;overflow:hidden;"></div>'):uki.createElement("div","position:absolute;z-index:100;-moz-user-focus:none;font-family:Arial,Helvetica,sans-serif;width:100%;height:"+(C.handleWidth-2)+"px;border: 1px solid #CCC;border-width: 1px 0;cursor:row-resize;cursor:ns-resize;z-index:200;overflow:hidden;background: url("+uki.theme.imageSrc("splitPane-vertical")+") 50% 50% no-repeat;");
if(!C.style.cursor||window.opera){C.style.cursor="n-resize"
}return C
},"splitPane-horizontal":function(C){C=C.handleWidth==1?uki.createElement("div","position:absolute;z-index:100;-moz-user-focus:none;font-family:Arial,Helvetica,sans-serif;height:100%;width:5px;margin-left:-2px;cursor:col-resize;cursor:ew-resize;z-index:200;overflow:hidden;background: url("+uki.theme.imageSrc("x")+")",'<div style="position:absolute;z-index:100;-moz-user-focus:none;font-family:Arial,Helvetica,sans-serif;background:#999;height:100%;width:1px;top:0px;left:2px;overflow:hidden;"></div>'):uki.createElement("div","position:absolute;z-index:100;-moz-user-focus:none;font-family:Arial,Helvetica,sans-serif;height:100%;width:"+(C.handleWidth-2)+"px;border: 1px solid #CCC;border-width: 0 1px;cursor:col-resize;cursor:ew-resize;z-index:200;overflow:hidden;background: url("+uki.theme.imageSrc("splitPane-horizontal")+") 50% 50% no-repeat;");
if(!C.style.cursor||window.opera){C.style.cursor="e-resize"
}return C
}}});
uki.theme.airport.backgrounds["button-disabled"]=uki.theme.airport.backgrounds["button-normal"];
uki.theme.airport.backgrounds["input-focus"]=uki.theme.airport.backgrounds["button-focus"];
uki.theme.airport.backgrounds["popup-shadow"]=uki.theme.airport.backgrounds["shadow-medium"];
uki.theme.airport.backgrounds["toolbar-popup"]=uki.theme.airport.backgrounds["popup-normal"];
uki.theme.airport.backgrounds["toolbar-popup-shadow"]=uki.theme.airport.backgrounds["shadow-medium"];
uki.theme.register(uki.theme.airport)
})();