import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-test-firebase',
  templateUrl: './test-firebase.component.html',
  styleUrls: ['./test-firebase.component.css']
})
export class TestFirebaseComponent implements OnInit,OnDestroy {
  unsubscribeToCollection:any;

  constructor(private afs: AngularFirestore) { }

  users:any = [];

  ngOnDestroy():void {
    // Stop listen to data changes when exit from components.
    this.unsubscribeToCollection();
  }

  async ngOnInit(): Promise<void> {
    // this.createDocumentByFulPath('test/testDocument4',{firstName: 'John', lastName: 'Doe', age: 30});
    // this.createDocumentByFulPath('test/testDocument4',{firstName: 'Elisha', lastName: 'Doe', age: 30});
    // this.createDocumentByFulPath('test/testDocument4',{age: 33});

    // Read document
    const data = await this.readDocument('test/testDocument2');
    console.log(data);

    // Get Collection
    this.getAllDocumentsFromCollection('test');
    
    // listen to collection changes
    this.getCollectionInRealTime('test');
  }

  createDocumentByCollection(): void {
    this.afs.collection('test').doc('testDocument2').set({firstName: 'John', lastName: 'Doe', age: 30})
    .then((success) => {
      console.log(success);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  // use this function to create and update document.
  // Importent note, if document not exist the function will create document. recommendation to use update methode. 
  createDocumentByFulPath(pathToDocument:string,data:any,merge:boolean=true): void {
    this.afs.doc(pathToDocument).set(data,{merge:merge})
    .then((success) => {
      console.log(success);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  async readDocument(pathToDocument:string) {
    try {
      const doc = await this.afs.doc(pathToDocument).ref.get(); // ref checks if document exist

      if(doc.exists) {  // exists is boolean
        console.log(doc);
        return doc.data();
      }
      return null;
    }
    catch (error) {
      console.log(error);
    }    
  }

  getAllDocumentsFromCollection(collection: string) {
    this.afs.collection(collection).ref.where('age','==',30).where('firstName','==','Elisha').get()
    .then((document) => {
      document.forEach((doc) => {
        console.log(doc.data());
      })
    })
    .catch((error) => {
      console.log(error);
    })
  }

  // This function reports to all about changes in database.
  getCollectionInRealTime(collection:string) {
    this.unsubscribeToCollection = this.afs.collection(collection).ref.onSnapshot((documents) => {
    // this.unsubscribeToCollection = this.afs.collection(collection).ref.where('age','==',30).onSnapshot((documents) => {
      this.users = [];
      documents.forEach((doc) => {
        this.users.push(doc.data());
        console.log(doc.data());
      });
    },
    (error) => {
      console.log(error);
    });
  }
}
