
#include <iostream>
using namespace std;

class student{
  string passcode;

  public:
  string name;
  int id;

  student(){
    //This is default constructor
  }

  // User defined constructor
  student(string passcode, string name, int id){
    this->name = name;
    this->id = id;
    this->passcode = passcode;
  }

  void into(){
    cout << "My name is " << name << ", my id is " << id << ", passcode is " << passcode << endl;
  }

  void setPass(string s){
    passcode = s;
  }
};

int main(){
  student s1;
  student s2("10","Mohit", 1);//Using constructor

  // int a = 10;
  // int *ptri = &a;

  student*ptr = &s2;
  cout << (*ptr).name << endl;

  return 0;
}
