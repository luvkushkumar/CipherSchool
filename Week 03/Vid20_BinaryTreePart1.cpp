#include<iostream>
#include<unordered_map>
#include<vector>

using namespace std;

// Leetcode problem solution
class solution{
    public:
    bool hasCycle(ListNode *head){
        unordered_map<ListNode *, int>mp;
        ListNode *t = head;

        while(t){
            if(mp.count(i->next))   return 1;

            mp[t]++;
            t = t->next;
        }

        return 0;
    }
};

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
