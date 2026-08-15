const $=id=>document.getElementById(id);

const f={
 studentName:$("studentName"),studentId:$("studentId"),rollNo:$("rollNo"),
 fatherName:$("fatherName"),course:$("course"),semester:$("semester"),
 department:$("department"),session:$("session"),blood:$("blood"),
 mobile:$("mobile"),dob:$("dob"),valid:$("valid")
};

function update(){
 $("pName").textContent=(f.studentName.value||"STUDENT NAME").toUpperCase();
 $("pStudentId").textContent=(f.studentId.value||"VSI-STU-001").toUpperCase();
 $("pRoll").textContent=(f.rollNo.value||"ROLL NO").toUpperCase();
 $("pCourse").textContent=(f.course.value||"COURSE").toUpperCase();
 $("pDepartment").textContent=(f.department.value||"DEPARTMENT").toUpperCase();
 $("pSession").textContent=(f.session.value||"2026-27").toUpperCase();

 $("bStudentId").textContent=(f.studentId.value||"VSI-STU-001").toUpperCase();
 $("bBlood").textContent=(f.blood.value||"O+").toUpperCase();
 $("bFather").textContent=(f.fatherName.value||"FATHER NAME").toUpperCase();
 $("bDob").textContent=f.dob.value||"DOB";
 $("bMobile").textContent=f.mobile.value||"MOBILE";
 $("bValid").textContent=f.valid.value||"VALID";
 $("barcodeText").textContent=(f.studentId.value||"VSI-STU-001").toUpperCase();
 makeBarcode();
}
Object.values(f).forEach(x=>x.addEventListener("input",update));

function loadImage(element,file,placeholder){
 if(!file)return;
 const reader=new FileReader();
 reader.onload=e=>{
   element.src=e.target.result;
   element.style.display="block";
   if(placeholder)placeholder.style.display="none";
 };
 reader.readAsDataURL(file);
}

$("studentPhoto").addEventListener("change",e=>{
 loadImage($("photoFront"),e.target.files[0],$("photoPlaceholder"));
});

$("companyLogo").addEventListener("change",e=>{
 const file=e.target.files[0];
 if(!file)return;
 loadImage($("logoFront"),file);
 loadImage($("logoBack"),file);
 loadImage($("headerLogo"),file);
});

function makeBarcode(){
 const box=$("barcode");
 box.innerHTML="";
 const text=(f.studentId.value||"VSI-STU-001").toUpperCase();
 for(let i=0;i<72;i++){
   const c=text.charCodeAt(i%text.length);
   const bar=document.createElement("i");
   bar.style.width=(((c+i*5)%3)+1)+"px";
   bar.style.height=(i%4===0?"100%":"82%");
   bar.style.marginTop=(i%4===0?"0":"9%");
   box.appendChild(bar);
 }
}

function cloneCard(source,target){
 const t=$(target);t.innerHTML="";
 const c=$(source).cloneNode(true);
 c.removeAttribute("id");
 t.appendChild(c);
}

$("printBtn").addEventListener("click",()=>{
 cloneCard("frontCard","printFront");
 cloneCard("backCard","printBack");
 window.print();
});

$("resetBtn").addEventListener("click",()=>{
 f.studentName.value="RAHUL KUMAR";
 f.studentId.value="VSI-STU-001";
 f.rollNo.value="2026-001";
 f.fatherName.value="MR. RAJ KUMAR";
 f.course.value="DIPLOMA IN CSE";
 f.semester.value="3rd SEM";
 f.department.value="COMPUTER SCIENCE & ENGINEERING";
 f.session.value="2026-27";
 f.blood.value="O+";
 f.mobile.value="+91 98765 43210";
 f.dob.value="15-08-2005";
 f.valid.value="31-07-2027";
 $("photoFront").src="";
 $("photoFront").style.display="none";
 $("photoPlaceholder").style.display="grid";
 update();
});

update();
