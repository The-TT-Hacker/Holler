import cheerio from 'cheerio';
import fetch from 'node-fetch';

import { Faculty } from "../common/models/faculty";
import { Subject } from "../common/models/subject";

export async function getUnswTimetable(): Promise<Faculty[]> {
  return fetch("http://timetable.unsw.edu.au/2020/subjectSearch.html")
    .then((res) => res.text())
    .then(fetchFaculties);
}

function fetchFaculties(body: string): Promise<Faculty[]> {
  const $ = cheerio.load(body);
  const FACULTY_TABLE_INDEX: number = 7;
  const content: any[] = $('table')[FACULTY_TABLE_INDEX].children[1].children;

  var promises: Promise<Faculty>[] = [];

  for (var i = 2; i < content.length; i++) {
    if (content[i].type != "tag") continue;
    if (content[i].name != "tr") continue;
    if (content[i].attribs.class != "rowLowlight" && content[i].attribs.class != "rowHighlight") continue;

    const facultyCode = content[i].children[1].children[0].children[0].data;
    const facultyUrl = content[i].children[1].children[0].attribs.href;
    const facultyName = content[i].children[3].children[0].children[0].data;

    const promise: Promise<Faculty> = fetch("http://timetable.unsw.edu.au/2020/" + facultyUrl)
                                    .then((respose) => respose.text())
                                    .then((body: string) => fetchClasses(body, facultyCode, facultyName));

    promises.push(promise);
  }

  return Promise.all(promises);
}

function fetchClasses(body: string, facultyCode: string, facultyName: string) {
  const $ = cheerio.load(body);
  const content = $("table")[8].children[1].children;

  var subjects: Subject[] = [];

  for (var i = 2; i < content.length; i++) {
    if (content[i].type != "tag") continue;
    if (content[i].name != "tr") continue;
    if (content[i].attribs.class != "rowLowlight" && content[i].attribs.class != "rowHighlight") continue;

    const courseCode = content[i].children[1].children[0].children[0].data;
    const courseUrl = content[i].children[1].children[0].attribs.href;
    const courseName = content[i].children[3].children[0].children[0].data;

    subjects.push({
      name: courseName,
      code: courseCode
    });
  }

  const promise: Promise<Faculty> =  Promise.resolve({
    name: facultyName,
    code: facultyCode,
    subjects: subjects
  });

  return promise;
}