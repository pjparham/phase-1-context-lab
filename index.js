/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function createEmployeeRecord(employeeArray){
    return {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employeeArrayofArrays){
    return employeeArrayofArrays.map(employee => createEmployeeRecord(employee))
}

function createTimeInEvent(dateStamp){
    let timeInEvent = {
        type: 'TimeIn',
        hour: parseInt(dateStamp.slice(11)),
        date: dateStamp.slice(0,10)
    } 
    this.timeInEvents.push(timeInEvent)
    return this
}

function createTimeOutEvent(dateStamp){
    let timeOutEvent = {
        type: 'TimeOut',
        hour: parseInt(dateStamp.slice(11)),
        date: dateStamp.slice(0,10)
    } 
    this.timeOutEvents.push(timeOutEvent)
    return this
}

function hoursWorkedOnDate(dateStamp){
    let employeeDate
    let timeIn
    let timeOut
    for(let i = 0; i < this.timeInEvents.length; i++){
        if (dateStamp == this.timeInEvents[i].date && dateStamp == this.timeOutEvents[i].date){
            employeeDate = this.timeInEvents[i].date
            timeIn = this.timeInEvents[i].hour
            timeOut = this.timeOutEvents[i].hour
        }
    }
    let rawHoursWorked = (timeOut - timeIn)
    let rawHoursWorkedString = rawHoursWorked.toString()
    let hoursWorkedString = rawHoursWorkedString.slice(0, -2)
    let hoursWorked = (parseInt(hoursWorkedString))
    return hoursWorked
}

function wagesEarnedOnDate(dateStamp){
    let hoursWorked = hoursWorkedOnDate.call(this, dateStamp)
    return hoursWorked*this.payPerHour
}

function findEmployeeByFirstName(employeeRecordArray, firstName){
    // console.log(employeeRecordArray)
    for (let i = 0; i < employeeRecordArray.length; i++){
        if (firstName == employeeRecordArray[i].firstName){
            return employeeRecordArray[i]
        }
        else{ return undefined}
    }
}

function calculatePayroll(employeeRecordArray){
    let allEmployeeWages = 0
    for (let i = 0; i < employeeRecordArray.length; i++){
        allEmployeeWages += allWagesFor.call(employeeRecordArray[i])
    }
    return allEmployeeWages
}