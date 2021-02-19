const TodoList = artifacts.require('./TodoList.sol')

contract('TodoList', (accounts) => {
  before(async () => {
    this.todoList = await TodoList.deployed()
  })
    // Pred behem testu nacte kontakt z blocenky

  it('deploys successfully', async () => {
    // kontroluje, jestli se kontrakt vytvoril v blocence
    // Adresa nesmi byt prazdna, null, undefined nebo hexadecimalni 0
    const address = await this.todoList.address
    assert.notEqual(address, 0x0)
    assert.notEqual(address, '')
    assert.notEqual(address, null)
    assert.notEqual(address, undefined)
  })
  
  it('lists tasks', async () => {
    const taskCount = await this.todoList.taskCount()
    const task = await this.todoList.tasks(taskCount)
    assert.equal(task.id.toNumber(), taskCount.toNumber())
    //Nejprve provedu test, o kterem vim, ze selze
    //assert.equal(task.work, 'Check out dappuniversity.com')
    // Nyni napiseme test, ktery zachytne spravne prvni vytvoreny task
    assert.equal(task.work, 'Zakoupit si https://www.alza.cz/media/kryptomeny-d5511564.htm')
    assert.equal(task.done, false)
    assert.equal(taskCount.toNumber(), 1)
  })

  it('toggles task completion', async () => {
    const result = await this.todoList.toggleCompleted(1)
    const task = await this.todoList.tasks(1)
    assert.equal(task.done, true)
    //const event = result.logs[0].args
    //assert.equal(event.id.toNumber(), 1)
    //assert.equal(event.done, true)
  })

  it('tests task creation', async () => {
    const result = await this.todoList.createTask('Test task 123')
    const taskCount = await this.todoList.taskCount()
    const task = await this.todoList.tasks(taskCount)
    assert.equal(task.work, 'Test task 123')
  })
})
