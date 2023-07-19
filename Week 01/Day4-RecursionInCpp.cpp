#include<iostream>
using namespace std;

// Function 01:
// Find if a person is eligible to vote 

bool canVote(int age){
  if(age >= 18)  return true;
  return false;
}

// Function 02:
// This function will display grades according to the marks provided

string grade(int marks){
  if(marks > 90) return "AA";
  else if(marks > 80) return "AB";
  else if(marks > 70) return "BB";
  else if(marks > 60) return "BC";
  else if(marks > 50) return "CD";
  else if(marks > 40) return "DD";
  else return "Fail";  
}

int sumOfNr(int nr){
  if(nr < 10) return nr;
  return (nr%10) + sumOfNr(nr/10);
}

int main(){

  cout << grade(5) << endl << grade(75) << endl << grade(100);
  return 0;
}
