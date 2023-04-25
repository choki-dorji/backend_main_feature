const axios = require("axios");

const ChartJS = async (req, res) => {
  let response;
  try {
    // get student data
    response = await axios.get("http://localhost:3000/students");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error fetching student data");
  }

  //   console.log(response.data);
  // if get student data, group them based on year and gender
  let groupedData = {};
  if (response && response.data.students && response.data.students.length > 0) {
    groupedData = response.data.students.reduce((acc, student) => {
      const year = `year${student.year}`;
      const gender = student.gender;
      if (!acc[year]) {
        acc[year] = { male: 0, female: 0 };
      }
      acc[year][gender]++;
      return acc;
    }, {});
  }
  // do something with the grouped data...
  // res.render("chart", { groupedData: groupedData });
  res.send(groupedData);
  // console.log(groupedData);
};
// total number
const TotalStudents = async (req, res) => {
  let response;
  try {
    // get student data
    response = await axios.get("http://localhost:3000/students");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error fetching student data");
  }

  // calculate total count of students
  const totalCount = response.data.students.length;

  return res.send(totalCount);
};

exports.ChartJS = ChartJS;
exports.TotalStudents = TotalStudents;
