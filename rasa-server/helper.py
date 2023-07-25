from kg import GenerateQuery
import random

# Function to retrieve labels for a specific painting
def get_query(painting_name):
    query = (
        "MATCH (p:Paintings {name: \"" + painting_name + "\"})-[r]-(linked_node) "
        "RETURN DISTINCT labels(linked_node) AS linked_labels"
    )
    return query

# Paintings' names for which you want to retrieve linked labels
painting_names = ["King Caspar","Head of a Boy in a Turban","Don Miguel de Castro, Emissary of Congo","Diego Bemba, a Servant of Don Miguel de Castro","Pedro Sunda, a Servant of Don Miguel de Castro","Map of Paranambucae","Portrait of a Black Girl","Portrait of a Man","Man in a Turban","Doritos","The New Utopia Begins Here: Hermina Huiswoud","The Unspoken Truth","Ilona","Head of a Boy","The Market in Dam Square","Two moors"]
# Dictionary to store painting names as keys and linked labels as values
painting_linked_labels = {}

def get_painting_links():
    ## making a list of painting labels ##
    for painting_name in painting_names:
    # query = GenerateQuery.find_linked_labels_query("King Caspar")
        query = get_query(painting_name)
        response_data = GenerateQuery.connect_to_kg(query)
        all_labels = [label for record in response_data for label in record["linked_labels"]]
        painting_linked_labels[painting_name] = all_labels
    
    for painting_name in painting_names:
        remove_attribute_for_painting(painting_linked_labels, painting_name, "GUEST")
        painting_linked_labels[painting_name].append("date")
        painting_linked_labels[painting_name].append("description")

    print("PaintLinks::Get_Painting_Links: Executed")
    
    return painting_linked_labels

# get_painting_links()
# print(painting_linked_labels)

# chosen_painting_name = 'Portrait of a Man'

# # Access the labels associated with the chosen painting
# chosen_painting_labels = painting_linked_labels.get(chosen_painting_name)

# # Print the labels of the chosen painting
# print("Labels for", chosen_painting_name, ":", chosen_painting_labels[1])

def remove_attribute_for_painting(painting_labels, painting_name, attribute_to_remove):
    if painting_name in painting_labels:
        if attribute_to_remove in painting_labels[painting_name]:
            painting_labels[painting_name].remove(attribute_to_remove)
            print(f"Attribute '{attribute_to_remove}' removed for painting '{painting_name}'.")
        else:
            print(f"Attribute '{attribute_to_remove}' is not present for painting '{painting_name}'.")
    else:
        print(f"Painting '{painting_name}' not found in the dictionary.")

# remove_attribute_for_painting(painting_labels, chosen_painting_name, attribute_to_remove)

# print("Updated labels for", chosen_painting_name, ":", painting_labels[chosen_painting_name])

def choose_rand_label(label_dict, painting_name, guest_interest, guest_id):
    
        if painting_name in label_dict:
            
            ret_val = ""
            counter = 0
            while(ret_val != "0000" and counter < 3):
                print("Helper::ChooseRandLabel::WhileCounter = ", counter)
                painting_label_list = label_dict[painting_name]
                # Choose random labels from the painting_label_list
                i = random.randint(0, len(painting_label_list)-1)
                random_label = painting_label_list[i]

                print("Randomly chosen label for painting:", random_label)
                
                if random_label in guest_interest['Likes']:
                        print(f"Guest likes the label '{random_label}' for this painting.")
                        ret_val = "likes"
                        # return ret_val
                elif random_label in guest_interest['Dislikes']:
                        print(f"Guest dislikes the label '{random_label}' for this painting.")
                        remove_attribute_for_painting(label_dict, painting_name, random_label)
                        ret_val = "dislikes"
                        # return ret_val
                else:
                        # Check if guest node has a link with any node having the same label
                        has_link = check_guest_has_link_with_label(guest_id, random_label)

                        if not has_link:
                            print(f"Guest has no preference for the label '{random_label}' for this painting (No link exists).")
                            ret_val = "0000"
                            # return random_label
                        else:
                            print(f"Guest has no preference for the label '{random_label}' for this painting (Link exists).")
                            ret_val = "link found"
                            counter = counter + 1
                            # return ret_val
            
            remove_attribute_for_painting(label_dict, painting_name, random_label)
            return random_label
        else:
            print(f"Painting '{painting_name}' not found in the dictionary.")

def check_guest_has_link_with_label(guest_id, label):
     if label == "date" or label == "description":
          print("CANT HANDLE DATE OR DESCRIPTION YET")
          return
     query = "MATCH (g:GUEST{id: \"" + str(guest_id) + "\"})-[:has_ASKED]->(n:" + str(label) + ") RETURN COUNT(n) > 0 AS has_link"
     print("Helper::checkGuestLink: " + query)
     hasLink = GenerateQuery.connect_to_kg(query)
     return hasLink
