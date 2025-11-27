import requests

# List of problems to populate
array_easies = [
    {
        "name": "Single Number",
        "leetcode_url": "https://leetcode.com/problems/single-number/",
        "difficulty": "EASY",
        "categories": [{"name": "arrays"}]
    },
    {
        "name": "Contains Duplicate",
        "leetcode_url": "https://leetcode.com/problems/contains-duplicate/",
        "difficulty": "EASY",
        "categories": [{"name": "arrays"}]
    }
]

array_mediums = [
    {
        "name": "Container With Most Water",
        "leetcode_url": "https://leetcode.com/problems/container-with-most-water/",
        "difficulty": "MEDIUM",
        "categories": [{"name": "arrays"}]
    },
    {
        "name": "Group Anagrams",
        "leetcode_url": "https://leetcode.com/problems/group-anagrams/",
        "difficulty": "MEDIUM",
        "categories": [{"name": "arrays"}]
    }
]

array_hards = [
    {
        "name": "Sliding Window Maximum",
        "leetcode_url": "https://leetcode.com/problems/sliding-window-maximum/",
        "difficulty": "HARD",
        "categories": [{"name": "arrays"}]
    },
    {
        "name": "Minimum Window Substring",
        "leetcode_url": "https://leetcode.com/problems/minimum-window-substring/",
        "difficulty": "HARD",
        "categories": [{"name": "arrays"}]
    }
]

trees_easies = [
    {
        "name": "Invert Binary Tree",
        "leetcode_url": "https://leetcode.com/problems/invert-binary-tree/",
        "difficulty": "EASY",
        "categories": [{"name": "trees"}]
    },
    {
        "name": "Maximum Depth of Binary Tree",
        "leetcode_url": "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
        "difficulty": "EASY",
        "categories": [{"name": "trees"}]
    },
    {
        "name": "Diameter of Binary Tree",
        "leetcode_url": "https://leetcode.com/problems/diameter-of-binary-tree/",
        "difficulty": "EASY",
        "categories": [{"name": "trees"}]
    }
]

trees_mediums = [
    {
        "name": "Count Good Nodes in Binary Tree",
        "leetcode_url": "https://leetcode.com/problems/count-good-nodes-in-binary-tree/",
        "difficulty": "MEDIUM",
        "categories": [{"name": "trees"}]
    },
    {
        "name": "Binary Tree Level Order Traversal",
        "leetcode_url": "https://leetcode.com/problems/binary-tree-level-order-traversal/",
        "difficulty": "MEDIUM",
        "categories": [{"name": "trees"}]
    }
]

trees_hards = [
    {
        "name": "Binary Tree Maximum Path Sum",
        "leetcode_url": "https://leetcode.com/problems/binary-tree-maximum-path-sum/",
        "difficulty": "HARD",
        "categories": [{"name": "trees"}]
    },
    {
        "name": "Serialize and Deserialize Binary Tree",
        "leetcode_url": "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/",
        "difficulty": "HARD",
        "categories": [{"name": "trees"}]
    }
]

linked_lists_easies = [
    {
        "name": "Merge Two Sorted Lists",
        "leetcode_url": "https://leetcode.com/problems/merge-two-sorted-lists/",
        "difficulty": "EASY",
        "categories": [{"name": "linked lists"}]
    },
    {
        "name": "Reverse linked lists",
        "leetcode_url": "https://leetcode.com/problems/reverse-linked-list/",
        "difficulty": "EASY",
        "categories": [{"name": "linked lists"}]
    }
]

linked_lists_mediums = [
    {
        "name": "Reorder List",
        "leetcode_url": "https://leetcode.com/problems/reorder-list/",
        "difficulty": "MEDIUM",
        "categories": [{"name": "linked lists"}]
    },
    {
        "name": "Copy List with Random Pointer",
        "leetcode_url": "https://leetcode.com/problems/copy-list-with-random-pointer/",
        "difficulty": "MEDIUM",
        "categories": [{"name": "linked lists"}]
    }
]

linked_lists_hards = [
    {
        "name": "Merge k Sorted Lists",
        "leetcode_url": "https://leetcode.com/problems/merge-k-sorted-lists/",
        "difficulty": "HARD",
        "categories": [{"name": "linked lists"}]
    },
    {
        "name": "Reverse Nodes in k-Group",
        "leetcode_url": "https://leetcode.com/problems/reverse-nodes-in-k-group/",
        "difficulty": "HARD",
        "categories": [{"name": "linked lists"}]
    }
]


problems = array_easies + array_mediums + array_hards
problems = problems + trees_easies + trees_mediums + trees_hards
problems = problems + linked_lists_easies + linked_lists_mediums + linked_lists_hards


for problem in problems:
    response = requests.post('http://localhost:8000/problems/', json=problem)
    if response.status_code == 201:
        print(f"{problem['name']} submitted successfully")
    else:
        print(f"Error submitting {problem['name']}: {response.status_code}")
        print(response.content)