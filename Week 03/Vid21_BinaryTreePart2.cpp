#include<iostream>
#include<unordered_map>
#include<vector>
#include <queue>

using namespace std;

struct BTnode{
    int val;
    struct *left;
    struct *right; 

    BTnode(int a){
        val = a;

    }

};

BTnode* make_bt_level_wise(){
    int val;
    cout <<"give root val" << endl;
    cin >> val;

    if(val == -1)   return NULL;

    BTnode*root = new BTnode(val);

    queue<BTnode*>q;
    q.push(root);

    while(!q.empty()){
        BTnode*f = q.front();
        q.pop();
        cout << "Enter left child of " << f->val <<" node "<< endl;
        int lc;
        cin>>lc;
        if(lc!=-1){
            BTnode*LeftC = new BTnode(rc);
            f->right = rightC;
            q.push(rightC);
        }

        cout << "Enter right child of " << f->val << " node " << endl;
        int rc; 
        cin >> rc;

        if(rc !=-1){
            BTnode*rightC = new BTnode(rc);
            f->right = rightC;
        }
    }

    return root;
}

BTnode* del(BTnode*root, int target){
    if(root == NULL)    return root;

    if(root-> val == target){
        if(root->left){
            root->val = root->left->val;

            root->left = del(root->left, root->left->val);
        }else if(root->right){
            root->val = root->right->val;
            root->right = del(root->right, root->right->val);
        }else{
            return NULL;
        }
        return root;
    }

    root->left = del(root->left, target);
    root->right = del(root->right, target);
    return root;
}

void print(BTnode*root){
    if(root == NULL)    return;

    cout << root->val << ": ";
    if(root->left)  cout << root->left->val<<" ";
    if(root->right) cout << root->right->val<<" ";

    cout << endl;

    cout << root->left <<endl;
    cout << root->right <<endl;

    return;

}


int main(){
    // BTnode*root = make_bt();
    BTnode*root = make_bt_level_wise();
    cout << root;
    BTnode*nroot = del(root,1);
    cout << nroot;
    return 0;
}
