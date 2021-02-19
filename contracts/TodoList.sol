pragma solidity ^0.5.0;


contract TodoList {
  uint public taskCount = 0; //verejna promena unsigned integer s default hodnotou 0

  struct Task {
    uint id;
    string work;
    bool done;
  }

  mapping(uint => Task) public tasks; //verejny slovnik klicem je id tasku a hodnotou je struktura Task
  
  event TaskCompleted(
    uint id,
    bool done
  );

  event TaskCreated(
    uint id,
    string work
  );


  constructor() public {
    createTask("Zakoupit si https://www.alza.cz/media/kryptomeny-d5511564.htm");
  }
  
  function createTask(string memory _work) public {
    taskCount++;   //navyseni poctu ukolu
    tasks[taskCount]= Task(taskCount, _work, false); //nova polozka mapovani a vytvoreni nove instance struktury Task
    //vyvolani eventu o vytvoreni tasku
    emit TaskCreated(taskCount, tasks[taskCount].work);
  }

  function toggleCompleted(uint _id) public {
    // lokalni instance struktury Task 
    Task memory _task = tasks[_id];
    // zmena na negaci toho, co je ulozeno v _task.done
    _task.done = !_task.done;
    tasks[_id] = _task;
    emit TaskCompleted(_id, _task.done);
  }

}
