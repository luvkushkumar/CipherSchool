#include <iostream>
using namespace std;

class complexNumber{

  public:
  int real;
  int img;

  complexNumber(int real, int img){
    this->real = real;
    this->img = img;
  }

  void display(){
    cout << real << "+ i" << img << endl;
  }

  complexNumber plus(complexNumber c){
    int r = this->real + c.real;
    int i = this->img + c.img;

    //return complexNumber(r,i);
    complexNumber result(r,i);
    return result;
  }

  complexNumber multiply(complexNumber c){
    // (a+ib) * (c+id) =
    // a*c - b*d + id*a + ib*c

    int x = this->real*c.real;
    int y = this->real*c.img;
    int z = this->img*c.real;
    int a = this->img*c.img;

    return complexNumber(x-a,y+z);
  }

  // return_type operator +(){} .. this overloads the operator +

  complexNumber operator +(complexNumber c){
    int r = this->real + c.real;
    int i = this->img + c.img;
    return complexNumber(r,i);
  }

  complexNumber operator -(complexNumber c){
    int r = this->real - c.real;
    int i = this->img - c.img;
    return complexNumber(r,i);
  }

  void operator ++(){
    this->real++;
    this->img++;
    return;
  }
  
};

int main(){
  complexNumber c1(5,5);
  complexNumber c2(1,1);
  complexNumber c4(2,2);
  complexNumber c3 = c1.plus(c2.plus(c4));

  complexNumber c5 = c1.multiply(c2);
  
  complexNumber c6 = c1 + c2;
  c5.display();
  c3.display();

  // * cannot be overloaded because it is used for multiplication and dereferencing, it is confusing for program to determine what to overload
  
  return 0;
}
