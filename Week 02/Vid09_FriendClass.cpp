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

  student(int id, string name, string passcode, int age){
    this->name = name;
    this->id = id;
    this->passcode = passcode;
    this->age = age;
  }

void setter(string s, int a, string n, int i){
  passcode = s;
  age = a;
  name = n;
  id = i;
}

  void into(){
    cout << "My name is " << name << ", my id is " << id << ", passcode is " << passcode<< endl;
  }

  void setPass(string s, int a){
    passcode = s;
    age = a;
  }

  friend void hacker(student s);
};

void hacker(student s){
  cout << s.passcode << " " << s.age << endl;
}

class bestfriend{
  public:

  void sharingsecret(student s){
    cout << s.passcode << " " << s.age << endl;
  }
};

int main(){
  student s1(1, "Mohit", "0001", 10);
  // s2.into();
  //s1.setter("0001", 10, "Mohit", 1);
  // s1.name = "Mohit";

  int a = 10;
  int *ptri = &a;

  student*ptrs = &s1;
  cout << ptrs->name << endl;
  // cout << (*ptrs).name << endl; 
  // bestfriend bff;
  // bff.sharingsecret(s1);
  // hacker(s1);

  // s1.passcode = "001";

  return 0;
}
