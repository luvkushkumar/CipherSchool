#include<iostream>
using namespace std;

int main(){
    int a = 10, b = 0;

    try{
        try{
            if(b==0)    throw 0;
            cout << a/b << endl;
        }
        // catch(int e){
        //     cout << e << " thrown from the try block!" << endl;
        // }
        catch(...){
            cout << " thrown from the try block!" << endl;
            throw;
        }
    }
    catch(...){
        cout << "Caught!" << endl;
    }

    // catch(char err){
    //     cout << err << " thrown from the try block!" << endl;
    // }



    cout << "Inside int main, outside try catch block" << endl;

    return 0;
}