#include <iostream>
using namespace std;

class student{
  string passcode;
  friend class bestfriend;
  
  protected:
  int age;

  public:
  string name;
  int id;

  student(){

  }

  student(string passcode, string name, int id){
    this->name = name;
    this->id = id;
    this->passcode = passcode;
    // this->age = age;
  }

  // student(string passcode, string name, int id): name(name),passcode(passcode),id(id){
  // }

  void into(){
    cout << "My name is " << name << ", my id is " << id << ", passcode is " << passcode<< endl;
  }

  void setPass(string s){
    passcode = s;
  }

  // This deletes the constructor
  ~student(){

  }
  
};


int main(){
  student s1;
  student s2("10", "Mohit", 1);
  student s3;

  s3 = s2;

  // s3+s2;

  

  return 0;
}
