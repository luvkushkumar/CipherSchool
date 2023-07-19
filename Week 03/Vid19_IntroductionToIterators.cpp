#include<iostream>
#include<vector>
using namespace std;

int main(){
    vector<string> solar_sys = {"mercury", "venus", "earth", "mars","jupiter","saturn","uranus","neptune"};

    vector<string>::iterator shivam = solar_sys.begin();
    vector<string>::iterator champa = solar_sys.begin();

    cout << "Shivam is at " << shivam << endl;
    advance(shivam, 3);
    cout << *shivam << endl;
    cout << "let's go to earth" << *(shivam+2) << endl;


    return 0;
}
