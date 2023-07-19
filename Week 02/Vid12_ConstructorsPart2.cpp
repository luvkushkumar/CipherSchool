#include <iostream>
using namespace std;

class Time{
  public:
  int hour, m;
  Time(int mins){
    hour = mins/60;
    m = mins%60;
  }

  void display(){
    cout << "The time is " << hour << " hours and " << m <<  " mins"<< endl;
  }

  operator int(){
    return (this->hour*60) + m;
  }

};


class uk{
  public:
  int kms;
  int mts;

  void display(){
    cout << kms << " kms and " << mts << " mtr"<< endl;
  }
};

class us{
  public:
  int miles;
  int feet;

  us(int m, int f){
    miles = m;
    feet = f;
  }

  void display(){
    cout << miles << " miles and " << feet << " feet" << endl;
  }

  us(uk obj){
    miles = obj.kms/1.6;
    feet = obj.mts/0.3;
  }

  operator uk(){
    uk duk;
    duk.kms = miles*1.6;
    duk.mts = feet*0.3;

    return duk;
  }
};

class Computer {
public:
    string model;
    float price;

    // Default constructor
    Computer() {
        model = "";
        price = 0.0;
    }

    // Parameterized constructor
    Computer(string m, float p) {
        model = m;
        price = p;
    }
};

class Mobile {
public:
    string model;
    float price;

    // Default constructor
    Mobile() {
        model = "";
        price = 0.0;
    }

    // Parameterized constructor
    Mobile(string m, float p) {
        model = m;
        price = p;
    }

    // Overloading assignment operator
    void operator=(const Computer& comp) {
        model = comp.model;
        price = comp.price;
    }
};

int main(){

  Time t(340);

  int timeTomin = (int)t;
  cout << "time in mins is " << timeTomin << endl;

  us dus(5,10);

  uk duk;

  duk = (uk)dus;

  us dus2(duk);


  Computer comp("Desktop", 1000.0);
  Mobile mob;
  mob = comp;

  cout << "Mobile model: " << mob.model << endl;
  cout << "Mobile price: " << mob.price << endl;


  return 0;
}
