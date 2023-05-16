const HttpError = require("../../models/httperror");
const axios = require("axios");

// exports.GetStudents = async (req, res, years) => {
//   const token = req.cookies.tokenABC;
//   console.log("token ", token);

//   try {
//     const response = await axios.get(
//       "https://gcit-user-management.onrender.com/api/v1/UM/join",
//       {
//         headers: {
//           Authorization: "Bearer " + token,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     let students = response.data.filter(
//       (student) => student.year === String(years) && student.isDisabled !== true
//     );
//     students = students.sort(() => Math.random() - 0.5);
//     console.log(students);
//     return students;
//   } catch (e) {
//     console.log(e);
//     console.log("server down");
//   }
// };

const STUDENTS = [
  {
    id: "b7d03dc9-e729-4f74-99f8-7d87b95a10b7",
    name: "Katie Johnson",
    password: "$2a$08$g8UDLirw81Gh1yQgY0blT.x64PlEwyZoJgZs9sJz.gUR8OPIwScC.",
    role: "user",
    program: "School of Business",
    specialization: "Marketing",
    status: "Active",
    stdtype: "Merit-Based Scholarship",
    meal_category: "Vegetarian",
    sid: 22003451,
    cid: "10507016783",
    gender: "F",
    email: "22003451.bc@univ.edu",
    bank: "Chase",
    account_no: 345678901,
    name_of_account_holder: "Katie Johnson",
    photo: "34gdwqwe2323",
    disability: false,
    medical_report: null,
    year: "2",
  },
  {
    id: "b643cbdc-7f74-4ea6-857b-dac9386cb015",
    name: "Sonam Wangdi",
    password: "$2a$08$TB6JczH1ecjr6ypR0cJNvesroEv5uhccetJvKzhpT.j3RD9cCpBI6",
    role: "user",
    program: "School of Computing",
    specialization: "Blockchain",
    status: "Reported",
    stdtype: "Government Scholarship",
    meal_category: "Mess",
    sid: 12200023,
    cid: "10705028037",
    gender: "M",
    email: "12200023.gcit@rub.edu.bt",
    bank: "BOB",
    account_no: 201951234,
    name_of_account_holder: "Sonam Wangdi",
    photo: "1GVsJchqCzQ2rE_zRf6WcdLz8irXyR9_5",
    disability: true,
    medical_report: "1N6tdJdbBGgat0BYLr20PpIBAAGbq6Ric",
    year: "3",
  },
  {
    id: "107bd4c5-7415-4987-8b9d-e0247d745ab3",
    name: "Tshering Wangchuk",
    password: "$2a$08$IJs9sM5ea0XUM7DUDthjw.Yl0XqKWnooeD1xaOuowN7..hJKrwVdG",
    role: "user",
    program: "School of Computing",
    specialization: "FullStack",
    status: "Reported",
    stdtype: "Government Scholarship",
    meal_category: "Mess",
    sid: 12220001,
    cid: "11100295432",
    gender: "M",
    email: "12220001.gcit@rub.edu.bt",
    bank: "BOB",
    account_no: 201212097,
    name_of_account_holder: "Tshering Wangchuk",
    photo: "1KifybWk3-v7-n8TfNzMtPKffscGCbf44",
    disability: false,
    medical_report: null,
    year: "1",
  },
  {
    id: "3d078e24-f324-48ad-b375-bc6b36ea2036",
    name: "Tashi Deki",
    password: "$2a$08$79tBRCedD6uddX5Y6EnK7OW1prWUgxsj9n0dvMHcULgD5CkP0zNUS",
    role: "user",
    program: "School of Computing",
    specialization: "Blockchain",
    status: "Reported",
    stdtype: "Government Scholarship",
    meal_category: "Mess",
    sid: 12200035,
    cid: "10705983652",
    gender: "F",
    email: "12200035.gcit@rub.edu.bt",
    bank: "BOB",
    account_no: 201998635,
    name_of_account_holder: "Tashi Deki",
    photo: "1sCguRLtWsWW2Qpast40Bp2Bjd5niiFCk",
    disability: false,
    medical_report: null,
    year: "3",
  },
  {
    id: "411b1c55-cd63-4948-8c97-e6fea12b5fea",
    name: "Pema Dawa",
    password: "$2a$08$cPL8fHV/VZglQNNDfcqiZelDtYd52ItfCJZDr7XzdaBlPnsjGqXqi",
    role: "user",
    program: "School of Computing",
    specialization: "Blockchain",
    status: "Reported",
    stdtype: "Government Scholarship",
    meal_category: "Mess",
    sid: 12210013,
    cid: "11100298375",
    gender: "M",
    email: "12210013.gcit@rub.edu.bt",
    bank: "BOB",
    account_no: 201238635,
    name_of_account_holder: "Pema Dawa",
    photo: "1GwhwFGggUT4SITQKHR1WyDiLCNbOPlEX",
    disability: false,
    medical_report: null,
    year: "2",
  },
  {
    id: "5ff26eef-fa8f-439f-88e2-dc56c7bd6a99",
    name: "Tashi Lhamo",
    password: "$2a$08$Ar7CiEo1yW5nxtZOjUDLB.dOVPcnRi9Ly2S/60S451d2BZbL5HjuS",
    role: "user",
    program: "School of Computing",
    specialization: "FullStack",
    status: "Reported",
    stdtype: "Government Scholarship",
    meal_category: "Mess",
    sid: 12190028,
    cid: "10705003005",
    gender: "F",
    email: "12190028.gcit@rub.edu.bt",
    bank: "BOB",
    account_no: 201958823,
    name_of_account_holder: "Tashi Lhamo",
    photo: "1vJJc1gTPq4ItpysXFIGbI4p0MfqUJRCI",
    disability: false,
    medical_report: null,
    year: "4",
  },
  {
    id: "7ccbe706-62d0-4512-83c4-924e47b88165",
    name: "Sangay Lakshay Yangzom",
    password: "$2a$08$gtenrazkW2SCiKPdwPPSyubt3Tj91phK0MtgtrVxGpoMtGbHuJFDO",
    role: "user",
    program: "School of Computing",
    specialization: "FullStack",
    status: "Reported",
    stdtype: "Government Scholarship",
    meal_category: "Mess",
    sid: 12190022,
    cid: "10705001001",
    gender: "F",
    email: "12190022.gcit@rub.edu.bt",
    bank: "BOB",
    account_no: 201958823,
    name_of_account_holder: "Sangay Lakshay",
    photo: "18ZDIccPskSCrmus3DMvjCHq5TDranG4y",
    disability: false,
    medical_report: null,
    year: "4",
  },
  {
    id: "82551714-d5fa-45cd-aa54-abc220e27a34",
    name: "Tshering Dema",
    password: "$2a$08$xuA3FCFpjrzUIVZRzXYMF.XsbY3cJBT4c5VQ/QzcapTzpgG5bN5ZS",
    role: "user",
    program: "School of Computing",
    specialization: "FullStack",
    status: "Reported",
    stdtype: "Government Scholarship",
    meal_category: "Mess",
    sid: 12210040,
    cid: "11100291234",
    gender: "F",
    email: "12210040.gcit@rub.edu.bt",
    bank: "BOB",
    account_no: 201238123,
    name_of_account_holder: "Tshering Dema",
    photo: "1BiAoBrHpZksCz6wNiwBUQ8FrTRfr5BDG",
    disability: false,
    medical_report: null,
    year: "2",
  },
  {
    id: "e974a38f-de0a-4eda-ae77-92464b6281f4",
    name: "Pema Selden",
    password: "$2a$08$L.aAkT/uz.5f3lhY67SSrus34IyJr7c5PZd8B4B7T8KFJkwEmyFQi",
    role: "user",
    program: "School of Computing",
    specialization: "Blockchain",
    status: "Reported",
    stdtype: "Government Scholarship",
    meal_category: "Mess",
    sid: 12220007,
    cid: "12031954321",
    gender: "F",
    email: "12220007.gcit@rub.edu.bt",
    bank: "BOB",
    account_no: 200287352,
    name_of_account_holder: "Pema Selden",
    photo: "1YTObBilbd42RNI5jmtl_8gz_QXkNW82M",
    disability: false,
    medical_report: null,
    year: "1",
  },
  {
    id: "e5c5f5a5-d670-4fb8-a5d5-5b4630aa6f06",
    name: "Yusuf Al-Sabir",
    password: "$2a$08$ppISyB0UC6NlJ6DitF6UbuJPZzXg/9L8bEBWdNv/YyEnRbcA6fOiG",
    role: "user",
    program: "School of Engineering",
    specialization: "Mechanical",
    status: "Active",
    stdtype: "Self-Financed",
    meal_category: "Non-Vegetarian",
    sid: 32002017,
    cid: "10809034782",
    gender: "M",
    email: "32002017.eng@univ.edu",
    bank: "Wells Fargo",
    account_no: 987654321,
    name_of_account_holder: "Yusuf Al-Sabir",
    photo: "34vbgtrfdsa21",
    disability: true,
    medical_report: "12erwqasd456",
    year: "4",
  },
  {
    id: "1e32c13f-c8ca-432f-944e-24c5dd5b5f21",
    name: "Emily Kim",
    password: "$2a$08$BAsjR31M4.gOwzC4q3ie3ulGjErLZm9eW8ch/Tb1d/KKzR4OXk4lW",
    role: "user",
    program: "School of Arts",
    specialization: "Visual Arts",
    status: "Active",
    stdtype: "International Student",
    meal_category: "Halal",
    sid: 12004567,
    cid: "10908032941",
    gender: "F",
    email: "12004567.arts@univ.edu",
    bank: "Bank of America",
    account_no: 123456789,
    name_of_account_holder: "Emily Kim",
    photo: "5rfvgy7hnmju8",
    disability: false,
    medical_report: null,
    year: "3",
  },
  {
    id: "d4e04296-9a0f-42da-85b1-eebb7c8d83a3",
    name: "John Smith",
    password: "$2a$08$eADucHfvw7zKbW.vgVfKNu.Szb.LBvH8GKjELd2QJFgSS/lPwvK8W",
    role: "user",
    program: "School of Medicine",
    specialization: "Neurology",
    status: "Inactive",
    stdtype: "Merit-Based Scholarship",
    meal_category: "Non-Vegetarian",
    sid: 52001341,
    cid: "10506012987",
    gender: "M",
    email: "52001341.md@univ.edu",
    bank: "Citibank",
    account_no: 456789012,
    name_of_account_holder: "John Smith",
    photo: "78ujnhbgty67",
    disability: true,
    medical_report: "2a2sdf43df23",
    year: "4",
  },
  {
    id: "1b9c25f3-8f08-4df3-9e45-4c2014f4db4d",
    name: "Samantha Lee",
    password: "$2a$08$QOfOCtZsUh90g4UBJ4YJ9uAI36n.VnsmATQblMvIWquSpaK.0ZwF6",
    role: "user",
    program: "School of Law",
    specialization: "Corporate Law",
    status: "Active",
    stdtype: "Self-Financed",
    meal_category: "Vegetarian",
    sid: 42004563,
    cid: "10401028650",
    gender: "F",
    email: "42004563.law@univ.edu",
    bank: "HSBC",
    account_no: 234567890,
    name_of_account_holder: "Samantha Lee",
    photo: "fg5h6j7k8l9",
    disability: false,
    medical_report: null,
    year: "2",
  },
  {
    id: "e48ccfed-dced-4a81-91c8-91baf15f1467",
    name: "Raj Patel",
    password: "$2a$08$uq7VZCUnNuhEGavV6c.e3.Aq9yQkPrf/Unbn41SLlVyIlv/8CRFxm",
    role: "user",
    program: "School of Education",
    specialization: "Elementary Education",
    status: "Active",
    stdtype: "Merit-Based Scholarship",
    meal_category: "Non-Vegetarian",
    sid: 82003579,
    cid: "10602012345",
    gender: "M",
    email: "82003579.edu@univ.edu",
    bank: "TD Bank",
    account_no: 345678901,
    name_of_account_holder: "Raj Patel",
    photo: "12sdf4g56h7j8",
    disability: false,
    medical_report: null,
    year: "3",
  },
  {
    id: "ebb5aa28-2d44-44f1-9906-0b857678d422",
    name: "Maria Rodriguez",
    password: "$2a$08$nJnmOMy7lLJbMEuV7AI8neGpZV7CKZpz/tk1cLhuy/h55xBP.2QaS",
    role: "user",
    program: "School of Nursing",
    specialization: "Pediatric Nursing",
    status: "Active",
    stdtype: "Government Scholarship",
    meal_category: "Non-Vegetarian",
    sid: 62004531,
    cid: "10903047912",
    gender: "F",
    email: "62004531.nurs@univ.edu",
    bank: "Capital One",
    account_no: 901234567,
    name_of_account_holder: "Maria Rodriguez",
    photo: "df34g5h67j8k9",
    disability: false,
    medical_report: null,
    year: "4",
  },
  {
    id: "73b1ca6f-06f7-4b19-9ed7-8477562ab8e7",
    name: "Adam Jones",
    password: "$2a$08$JDeOZoggezLfg8EYxrstTe0XhdyJ/bpH/JO8tDRg0Ri2zlf.EsOXO",
    role: "user",
    program: "School of Science",
    specialization: "Chemistry",
    status: "Active",
    stdtype: "Self-Financed",
    meal_category: "Non-Vegetarian",
    sid: 92001233,
    cid: "10801023344",
    gender: "M",
    email: "92001233.sci@univ.edu",
    bank: "PNC Bank",
    account_no: 678901234,
    name_of_account_holder: "Adam Jones",
    photo: "as23df4g56h",
    disability: false,
    medical_report: null,
    year: "2",
  },
  {
    id: "6f8d6d5a-1e43-4a95-8908-6c2f5e5f6c05",
    name: "Elena Garcia",
    password: "$2a$08$b89ZmY.1DDeeuOaLzB0heuTgTb9XJtB08eHlC8NvZq3kZzjjljdb2",
    role: "user",
    program: "School of Public Health",
    specialization: "Epidemiology",
    status: "Active",
    stdtype: "Merit-Based Scholarship",
    meal_category: "Vegetarian",
    sid: 52003312,
    cid: "10306001234",
    gender: "F",
    email: "52003312.ph@univ.edu",
    bank: "BB&T",
    account_no: 123456789,
    name_of_account_holder: "Elena Garcia",
    photo: "fghjklwerty",
    disability: true,
    medical_report: null,
    year: "3",
  },
  {
    id: "d0a33a2c-1cb2-48d9-9cd9-507bf7a45013",
    name: "Mohammed Ali",
    password: "$2a$08$h7XnJlNMBQnVU5v6JQZNXu1M30qI3xu/TvWhYm9J/vhE6li1bwWuG",
    role: "user",
    program: "School of Business",
    specialization: "Finance",
    status: "Active",
    stdtype: "International Student",
    meal_category: "Halal",
    sid: 12005678,
    cid: "10504019348",
    gender: "M",
    email: "12005678.bc@univ.edu",
    bank: "HSBC",
    account_no: 345678901,
    name_of_account_holder: "Mohammed Ali",
    photo: "3g3hj54jk5h6",
    disability: false,
    medical_report: null,
    year: "4",
  },
];

exports.GetStudents = (years) => {
  let students = STUDENTS.filter(
    (student) => student.year === String(years) && student.disability !== true
  );
  students = students.sort(() => Math.random() - 0.5);
  return students;
};

exports.countStudentsByYear = (years) => {
  let maleCount = 0;
  let femaleCount = 0;

  const students = STUDENTS;

  // Iterate over each student
  students.forEach((student) => {
    // Check if the student's year matches the specified year
    if (student.year === years) {
      // Increment the corresponding count based on the student's gender
      if (student.gender === 'M') {
        maleCount++;
      } else if (student.gender === 'F') {
        femaleCount++;
      }
    }
  });

  // Return an object with the male and female counts
  return { male: maleCount, female: femaleCount };
}


exports.GetAllStudents = () => {
  return STUDENTS
}


exports.TotalAllStudents = (req, res) => {
  res.json(STUDENTS)
}

exports.studentsbyName = (req, res) => {
  const stdname = req.params.id;
  let students = STUDENTS.filter(
    (student) => student.name === stdname
  );
  res.json(students)
}
