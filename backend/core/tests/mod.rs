use lazy_static::lazy_static;

mod models;
mod requests;
mod tasks;

lazy_static! {
    /// Constants for cleaning up user model data, replacing certain patterns with placeholders.
    static ref CLEANUP_USER_MODEL: Vec<(&'static str, &'static str)> = vec![
        (
            r"([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})",
            "PID"
        ),
        (r"([A-Za-z0-9-_]*\.[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*)","TOKEN")
    ];

    /// Constants for cleaning up date data, replacing date-time patterns with placeholders.
    static ref CLEANUP_DATE: Vec<(&'static str, &'static str)> =
        vec![
            (r"\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d+", "DATE"),
            (r"(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2})", "DATE")
            ];

    /// Constants for cleaning up generals model data, replacing IDs with placeholders.
    static ref CLEANUP_MODEL: Vec<(&'static str, &'static str)> = vec![(r"id: \d+,", "id: ID")];
    static ref CLEANUP_MAIL: Vec<(&'static str, &'static str)> = vec![
            (r"[0-9A-Za-z]+{40}", "IDENTIFIER"),
            (r"\w+, \d{1,2} \w+ \d{4} \d{2}:\d{2}:\d{2} [+-]\d{4}", "DATE"),
            (r"([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})","RANDOM_ID"),
            // #6c23875d-3523-4805-8527-f2=\r\n82d3aa7514\
            (r"([0-9a-fA-F]{8}-[0-9a-fA-F]{4})-[0-9a-fA-F]{4}-.*[0-9a-fA-F]{4}", "RANDOM_ID")
        ];
}

fn cleanup_user_model(has_password: bool) -> Vec<(&'static str, &'static str)> {
    let mut combined_filters = CLEANUP_USER_MODEL.to_vec();
    combined_filters.extend(CLEANUP_DATE.iter().copied());
    combined_filters.extend(CLEANUP_MODEL.iter().copied());
    if has_password {
        combined_filters.extend(vec![(
            r"password: Some\(.*\n.*\n.*\,",
            "password: \"PASSWORD\",",
        )]);
    }
    combined_filters
}
