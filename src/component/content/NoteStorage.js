    
    
    
// export default function getItemsFromStorage(){
//      let noteListA;
//     if(localStorage.getItem('items') === null){
//       noteListA = [];
//     } else {
//       noteListA = JSON.parse(localStorage.getItem('items'));
//     }
//     return noteListA;
  
//   }

  class NoteStorage {
    // constructor () {}

      storeItem(item){
      let noteListA;
      // let arrayNote =[];
      // Check if any items in ls
      if(localStorage.getItem('items') === null){
        noteListA = [];
        // Push new item
        noteListA.push(item);
        
        // noteListA.push(item);
        // Set ls
        localStorage.setItem('items', JSON.stringify(noteListA));
      } else {
        // Get what is already in ls
        noteListA = JSON.parse(localStorage.getItem('items'));
    
        // Push new item
        noteListA.push(item);
        console.log(noteListA.reverse());
        
    
        // Re set ls
        localStorage.setItem('items', JSON.stringify(noteListA));
      }
    }

    

    getItemsFromStorage(){
             let noteListA;
            if(localStorage.getItem('items') === null){
              noteListA = [];
              return noteListA;
            } else {
              noteListA = JSON.parse(localStorage.getItem('items'));
            }
            return noteListA;
          
          }


          updateItemStorage(updatedItem){
            
            let noteListA = JSON.parse(localStorage.getItem('items'));
      
            noteListA.forEach(function(item, index){
              if(updatedItem.id === item.id){
                console.log(updatedItem);
                
                noteListA.splice(index, 1, updatedItem);
              }
            });
            localStorage.setItem('items', JSON.stringify(noteListA));
          }

          deleteItemFromStorage(id){
            
            let noteListA = JSON.parse(localStorage.getItem('items'));
      
            noteListA.forEach(function(item, index){
              if(id === item.id){
                noteListA.splice(index, 1);
              }
            });
            localStorage.setItem('items', JSON.stringify(noteListA));
          }
           clearItemsFromStorage(){
            localStorage.removeItem('items');
          }

    nameLast () {
      return "how are you";
    }
    
  }
    // module.exports = NoteStorage;
    export default NoteStorage;
 
