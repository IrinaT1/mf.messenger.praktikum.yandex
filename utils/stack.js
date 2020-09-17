class Stack {
    constructor() {
        this.size = 0;
        this.head = null;
    }
	
		// Кладёт элемент на стек.
		// Возвращает новый размер стека.
    push(value) {
        const node = { value, prev: null };
        if (this.size == 0) {
          this.head = node;
          this.size = 1;
        } else {
          node.prev = this.head;
          this.head = node;
          this.size += 1;
        }
        
        return this.size;
    }
		
		// Убирает элемент со стека.
		// Если стек пустой, кидает ошибку.
		// Возвращает удалённый элемент.
    pop() {
        if (this.size == 0) {
          throw Error("Stack is empty!");
        }   
        
        let val = this.peek();
        
        this.head = this.head.prev;
        return val;
    }
		
		// Возвращает верхний элемент стека без его удаления.
    peek() {
        return this.head.value;
    }
		
		// Если стек пуст, возвращает true. В противном случае –– false.
    isEmpty() {
        if (this.size == 0) {
          return true;
        }
      return false;
    }
    
    print() {
    	let arr = [];
      if (this.size > 0) {
        arr.push(this.head.value);
        let p = this.head.prev;
        while(p != null) {
          arr.push(p.value);
          p = p.prev;
        }      	
      }
      
      arr = arr.reverse();
      console.log("arr: ", arr);
    }
}

let stack = new Stack();
stack.push(5);
stack.push(6);
stack.push(7);
stack.push(138);

stack.pop();

stack.print();