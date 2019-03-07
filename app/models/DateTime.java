package models;

public class DateTime {

    private int day;
    private int month;
    private int year;
    private int hour;
    private int minutes;
    private int delayedHours = 0;

    public DateTime(String date) {

        //Split the date string and get the year, month and the day
        String[] parts = date.split("-", 3);
        this.year = Integer.parseInt(parts[0]);
        this.month = Integer.parseInt(parts[1]);
        this.day = Integer.parseInt(parts[2]);
    }

    public DateTime(String date, String time) {

        //Split the time string and get the hours and minutes
        String[] timeParts = time.split(":", 2);
        this.hour= Integer.parseInt(timeParts[0]);
        this.minutes = Integer.parseInt(timeParts[1]);

        //Split the date string and get the year, month and the day
        String[] parts = date.split("-", 3);
        this.year = Integer.parseInt(parts[0]);
        this.month = Integer.parseInt(parts[1]);
        this.day = Integer.parseInt(parts[2]);
    }

    public DateTime(String dueDate, String dueTime,String retDate,String retTime) {

        int dueHour;
        int dueMinutes;
        int dueYear;
        int dueMonth;
        int dueDay;
        int retHour;
        int retMinutes;
        int retYear;
        int retMonth;
        int retDay;

        int yearDifference;
        int monthDifference;
        int dayDifference;
        int hourDifference;
        int minuteDifference;

        //Get due hours and minutes
        String[] dueTimeParts = dueTime.split(":", 2);
        dueHour= Integer.parseInt(dueTimeParts[0]);
        dueMinutes = Integer.parseInt(dueTimeParts[1]);

        //Get due year, month and day
        String[] dueDateParts = dueDate.split("-", 3);
        dueYear = Integer.parseInt(dueDateParts[0]);
        dueMonth = Integer.parseInt(dueDateParts[1]);
        dueDay = Integer.parseInt(dueDateParts[2]);

        //Get returning hours and minutes
        String[] retTimeParts = retTime.split(":", 2);
        retHour= Integer.parseInt(retTimeParts[0]);
        retMinutes = Integer.parseInt(retTimeParts[1]);

        //Get returning year, month and day
        String[] retDateParts = retDate.split("-", 3);
        retYear = Integer.parseInt(retDateParts[0]);
        retMonth = Integer.parseInt(retDateParts[1]);
        retDay = Integer.parseInt(retDateParts[2]);

        //Calculate differences in years, months, days, hours, minutes
        yearDifference = retYear - dueYear;
        monthDifference = retMonth - dueMonth;
        dayDifference = retDay - dueDay;
        hourDifference = retHour - dueHour;
        minuteDifference = retMinutes - dueMinutes;

        //Calculate the difference in hours
        calculateLateHours(yearDifference,monthDifference,dayDifference,hourDifference,minuteDifference);
    }


    public void calculateLateHours(int yearDifference, int monthDifference, int dayDifference, int hourDifference, int minuteDifference){

        int yearHours = 0;
        int monthHours = 0;
        int dayHours = 0;
        int hoursByTime = 0;

        //Calculation of hours
        yearHours = yearDifference*365*24;
        monthHours = monthDifference*30*24;
        dayHours = dayDifference*24;
        hoursByTime = ((hourDifference*60) + minuteDifference)/60;

        //Store the total delay in hours
        this.delayedHours = yearHours+monthHours+dayHours+hoursByTime;
    }

    //Accessor methods
    public int getDay() {
        return day;
    }

    public void setDay(int date) {
        this.day = date;
    }

    public int getMonth() {
        return month;
    }

    public void setMonth(int month) {
        this.month = month;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }


    public String getDate(){
        return String.valueOf(this.year) + "-" + String.valueOf(this.month) + "-" + String.valueOf(this.day) ;
    }

    public String getTime(){
        return String.valueOf(this.hour) + ":" + String.valueOf(this.minutes);
    }

    public int getLateHours(){
        return this.delayedHours;
    }

    public String getDueDate(int moreDays){

        int tempDay = this.day;
        int tempMonth = this.month;
        int tempYear = this.year;

        //For the months with 31 days
        if(tempMonth==1||tempMonth==3||tempMonth==5||tempMonth==7||tempMonth==8||tempMonth==10){
            if((tempDay+moreDays)>31){ //If the total exceeds the 31 day limit
                tempDay = (tempDay+moreDays)-31;
                tempMonth= tempMonth+1;
            }
            else { //If the total doesn't exceed the 31 day limit
                tempDay = tempDay+moreDays;
            }
            return String.valueOf(tempYear) + "-" + String.valueOf(tempMonth) + "-" + String.valueOf(tempDay) ;
        }
        //For the months with 30 days
        else if(tempMonth==4||tempMonth==6||tempMonth==9||tempMonth==11){
            //IF the total exceed the 30 day limit
            if((tempDay+moreDays)>30){
                tempDay= (tempDay+moreDays)-30;
                tempMonth= tempMonth+1;
            }
            //If the total is within the 30 day limit
            else {
                tempDay = tempDay+moreDays;
            }
            return String.valueOf(tempYear) + "-" + String.valueOf(tempMonth) + "-" + String.valueOf(tempDay) ;
        }
        //For February which has 29 days in leap years
        else if(tempMonth==2){
            //Check whether the year is a leap year
            if((tempYear%4==0&&tempYear%100!=0)||(tempYear%4==0&&tempYear%100==0&&tempYear%400==0)){
                //If it exceeds the 29 day limit
                if((tempDay+moreDays)>29){
                    tempDay = (tempDay+moreDays)-29;
                    tempMonth= tempMonth+1;
                }
                //If the total is within the 29 day limit
                else {
                    tempDay = tempDay+moreDays;
                }
                return String.valueOf(tempYear) + "-" + String.valueOf(tempMonth) + "-" + String.valueOf(tempDay) ;
            }
            //If it is not a leap year
            else{
                //If it exceeds the 28 day limit
                if((tempDay+moreDays)>28){
                    tempDay= (tempDay+moreDays)-28;
                    tempMonth= tempMonth+1;
                }
                //If its within the 28 day limit
                else {
                    tempDay = tempDay+moreDays;
                }
                return String.valueOf(tempYear) + "-" + String.valueOf(tempMonth) + "-" + String.valueOf(tempDay) ;
            }
        }
        //For December
        else if(tempMonth==12){
            //If it exceeds the 31 day limit, 1 year should be added
            if((tempDay+moreDays)>31){
                tempDay = (tempDay+moreDays)-31;
                tempMonth= 1;
                tempYear=tempYear+1;
            }
            else {
                tempDay = tempDay+moreDays;
            }
            return String.valueOf(tempYear) + "-" + String.valueOf(tempMonth) + "-" + String.valueOf(tempDay) ;
        }
        //If the date falls into none of these categories, that means it is an invalid date
        else{
            return "Invalid date" ;
        }


    }

    //Overridden toString method to print the actual date other than the memory address
    @Override
    public String toString() {
        return String.valueOf(this.year) + "-" + String.valueOf(this.month) + "-" + String.valueOf(this.day);
    }

    public String getNewReserveDate(int days) {

        String reserveDate = getDueDate(days);
        return reserveDate;

    }
}

