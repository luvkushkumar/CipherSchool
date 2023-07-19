#include <iostream>
using namespace std;

// Class problem

// Access Modifiers:
// Public: Everyone
// Private: only class(default)
// Protected: within classes

// Getters and setters are used because since we can not directly use the private elements, we can use setters and getters to get and set things

class student{
  private:
  string passcode;

  protected:
  int age;

  public:
  string name;
  int id;

  void into(){
    cout << "My name is " << name << ", my id is "<<id<<endl;
  }

  void setPass(string s, int a){
    passcode = s;
    age = a;
  }

  friend void hacker(student s);
  friend class bestfriend;

};

class bestfriend{
  public:
  void sharingsecret(student s){
    cout << s.passcode << " " << s.age << endl;
  }
};

void hacker(student s){
  cout << s.passcode << " " << s.age << endl;
}
// Important points
// If we do not declare an object, system will not use any memory
// If we declare an object of empty class, it will allocate 1 byte because it will save the address of the object

int main(){
  student s1;
  s1.name = "Thisisname";
  s1.id = 1;
  s1.setPass("001", 21);
  s1.into();

  bestfriend bff;
  bff.sharingsecret(s1);

  return 0;
}
