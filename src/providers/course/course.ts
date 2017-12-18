import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import firebase from 'firebase';

import { Course } from '../../interface/course';

/*
  Generated class for the CourseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CourseProvider {

    public courseData: firebase.database.Reference;
    constructor() {
        this.courseData = firebase.database().ref('course');
    }

    createCourse(course: Course): firebase.database.ThenableReference {
        return this.courseData.push(course);
    }

    getCourse(): firebase.database.Reference {
        return this.courseData;
    }

    getCourseById(key: string): firebase.database.Reference {
        return this.courseData.child(key);
    }

}
