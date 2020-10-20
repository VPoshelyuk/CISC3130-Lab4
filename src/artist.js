/*
    Artist class
    @param {string} name
    @param {number} appNum
    @param {Artist} next
 */
class Artist {
    constructor(name, appNum, next = null) {
        this.name = name;
        this.appNum = appNum;
        this.next = next;
    }
}

/*
    TopStreamingArtists class
    @param {Artist} head
    Available methods:
    -> insertSorted
    -> size
    -> clear
    -> getAt
    -> forEach
 */
class TopStreamingArtists {
    constructor() {
        this.head = null
    }

    /*
        * @param {Artist} node
    */
    insertSorted (node) {
        //if LL is empty or head's node value is greeater then the value
        //of the passed node, we replace a head with passed node
        if(!this.head || this.head.name.localeCompare(node.name) >= 0) {
            node.next = this.head 
            this.head = node 
        } else {
            //otherwise we iterate over LL's nodes until we find the one that has
            //a "lesser value" name than the passed node or until we reach the end of LL
            let current = this.head
            while (current.next && current.next.name.localeCompare(node.name) < 0) {
                current = current.next; 
            }
            //then we insert our node after current
            //by pointing it to whatever current was pointing to
            //and pointing current to our passed node
            node.next = current.next; 
            current.next = node; 
        }
    }

    /*
        * @return {number}
    */
    size() {
        let counter = 0 //declare counter var
        if (this.head) { //if LL is not empty
            let check = this.head //we don't want to modify LL
            while(check){ //loop through all the nodes
                counter++
                check = check.next
            }
        }
        return counter
    }

    clear() {
        //to clear LL, simply set head to null
        this.head = null
    }

    /*
        * @param {number} index
        * @return {Artist}
    */
    getAt(index){
        let counter = 0 //declare counter var
        let check = this.head //we don't want to modify LL
        if (this.head) { //if LL is not empty
            while(counter < index){ //loop through the nodes till we reach the one at desired location
                counter++
                check = check.next
            }
        }
        return check
    }

    /*
        * @param {function} _
    */
    forEach(_) {
        if (!this.head) return //if LL is empty, break
        for (let i = 0; i < this.size(); i++) {
            _(this.getAt(i)) //apply the passed funcion to every node
        }
    }
}

//export classes
module.exports = {
    Artist : Artist,
    TopStreamingArtists : TopStreamingArtists
  }