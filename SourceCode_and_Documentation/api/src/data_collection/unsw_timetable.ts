const cheerio = require('cheerio');
const fetch = require('node-fetch');

export async function getEvents(): Promise<any[]> {
  return fetch("http://timetable.unsw.edu.au/2020/subjectSearch.html")
    .then((res: Response) => res.text())
    .then((body: string) => extractFaculties(body));
}

function extractFaculties(body: string): Promise<any> {
  const $ = cheerio.load(body);
  const FACULTY_TABLE_INDEX: number = 7;
  //const 
  const content: any[] = $('table')[FACULTY_TABLE_INDEX].children[1].children;

  var faculties: any[] = [];

  for (var i = 2; i < content.length; i++) {
    if (content[i].type != "tag") continue;
    if (content[i].name != "tr") continue;
    if (content[i].attribs.class != "rowLowlight" && content[i].attribs.class != "rowHighlight") continue;

    const facultyCode = content[i].children[1].children[0].children[0].data;
    const facultyUrl = content[i].children[1].children[0].attribs.href;
    const facultyName = content[i].children[3].children[0].children[0].data;

    faculties.push({
      facultyCode: facultyCode,
      facultyUrl: facultyUrl,
      facultyName: facultyName
    });
  }

  console.log(faculties);

  return new Promise(() => console.log("promise callback"));
}