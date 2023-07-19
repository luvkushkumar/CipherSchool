#include<bits/stdc++.h>
using namespace std;

// Program Number: 1
// Doing arithmetic operations using a function

int sum(int a, int b){
  return a+b;
}

int diff(int a, int b){
  return a-b;
}

int multiply(int a, int b){
  return a*b;
}

int div(int a, int b){
  if(b != 0)  return a/b;
  else cout << "You can't divide with zero";
  return ;
}

// Program Number: 2 
// Overloading a Function in C++

// Firstly, creating a function named maxi
int maxi(int n1,int n2){
    if(n1>n2)return n1;
    return n2;
}

// Now we are overloading the function maxi by giving 3 parameters
int maxi(int n1,int n2,int n3){
    if(n1>n2){
        if(n1 > n3)return n1;
        return n3;
    }else{
        if(n2>n3)return n2;
        return n3;
    } 
}

// Now we are overloading the function maxi by giving 4 parameters
int maxi (int n1,int n2,int n3, int n4){
    return maxi(n1, maxi(n2, n3, n4));
}


// Program Number: 3
// Using increment and decrement operator by creating a function

void increment (int a){
    a++;
    return ;
}

void decrement (int a){
    a--;
    return ;
}


int main(){
    // Using function 01 : Doing arithmetic operations
    cout << sum(4,2) << endl;
    cout << diff(4,2) << endl;
    cout << multiply(4,2) << endl;
    cout << div(4,2) << endl;

    // Using function 02 : Overloading a function
    cout << maxi(2,3) << endl;
    cout << maxi(4,2,3) << endl;
    cout << maxi(2,9,8,3) << endl;

    // Using function 03: Increment and decrement using function
    cout << increment(5) << endl;
    cout << decrement(5) << endl;


    return 0;
  


  
}
